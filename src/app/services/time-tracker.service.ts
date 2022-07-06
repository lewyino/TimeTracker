import {Injectable} from '@angular/core';
import {TimeTrackerModel} from "../models/time-tracker-model";
import {TimeTrackerType} from "../models/time-tracker-type";
import {getModel, getType} from "../utils/type.utils";
import {BehaviorSubject, catchError, combineLatest, map, Observable, of} from "rxjs";
import {BreakModel} from "../models/break-model";
import {HttpClient} from "@angular/common/http";
import {IssueModel} from "../models/issue-model";

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerService {

  timeTracker: TimeTrackerModel = new TimeTrackerModel();
  originalTimeTracker: TimeTrackerModel = new TimeTrackerModel();
  timeTracker$ = new BehaviorSubject<TimeTrackerModel>(this.timeTracker);

  private readonly URL = 'http://localhost:3000/time-tracker-list';

  constructor(private httpClient: HttpClient) {}

  getTimeTracker(): Observable<TimeTrackerModel> {
    return this.timeTracker$.asObservable();
  }

  loadData() {
    this.httpClient.get<Array<any>>(this.URL)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
      )
      .subscribe((data) => {
        this.timeTracker.list = data.map((item) => getModel(item.type, item));
        this.originalTimeTracker.list = data.map((item) => getModel(item.type, item));
        this.timeTracker$.next(this.timeTracker);
        console.table(this.timeTracker.list);
      });
  }

  saveTimeTracker(timeTracker: TimeTrackerModel): Observable<boolean> {
    const toRemove = this.originalTimeTracker.list
      .filter((item) => !timeTracker.list.find((toFind) => toFind.uid === item.uid))
      .map((item) => this.dbDeleteItem(item));
    const toEdit = timeTracker.list
      .filter((item) => !!this.originalTimeTracker.list.find((toFind) => toFind.uid === item.uid))
      .map((item) => this.dbEditItem(item));
    const toAdd = timeTracker.list
      .filter((item) => !this.originalTimeTracker.list.find((toFind) => toFind.uid === item.uid))
      .map((item) => this.dbAddItem(item));
    return combineLatest(toRemove.concat(toEdit).concat(toAdd))
      .pipe(
        map((data: boolean[]) => data.every((item) => item))
      );
  }

  dbEditItem(timeTrackerItem: BreakModel): Observable<boolean> {
    return this.httpClient.put(this.URL + '/' + timeTrackerItem.uid, this.getModelForSaveInDb(timeTrackerItem))
      .pipe(
        map(() => true),
        catchError((error) => {
          console.error(error);
          return of(false);
        }),
      );
  }

  dbDeleteItem(timeTrackerItem: BreakModel): Observable<boolean> {
    return this.httpClient.delete(this.URL + '/' + timeTrackerItem.uid)
      .pipe(
        map(() => true),
        catchError((error) => {
          console.error(error);
          return of(false);
        }),
      );
  }

  dbAddItem(timeTrackerItem: BreakModel): Observable<boolean> {
    return this.httpClient.post(this.URL, this.getModelForSaveInDb(timeTrackerItem))
      .pipe(
        map(() => true),
        catchError((error) => {
          console.error(error);
          return of(false);
        }),
      );
  }

  addItem(type: TimeTrackerType) {
    this.timeTracker.list.push(getModel(type, {} as BreakModel));
    this.timeTracker$.next(this.timeTracker);
  }

  removeItem(uid: string) {
    this.timeTracker.list =
      this.timeTracker.list
        .filter((item) => item.uid !== uid)
    this.timeTracker$.next(this.timeTracker);
  }

  getItemById(id: string): Observable<IssueModel | null> {
    return this.httpClient.get<any[]>(this.URL + '?id=' + id)
      .pipe(
        map((items: any[]) => items.length ? new IssueModel(items[0]) : null)
      )
  }

  private getModelForSaveInDb(model: BreakModel) {
    return {...model, type: getType(model)};
  }
}
