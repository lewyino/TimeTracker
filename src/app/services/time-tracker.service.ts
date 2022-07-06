import { Injectable } from '@angular/core';
import {TimeTrackerModel} from "../models/time-tracker-model";
import {TimeTrackerType} from "../models/time-tracker-type";
import {getModel} from "../utils/type.utils";
import {BehaviorSubject, catchError, combineLatest, filter, map, Observable, of, ReplaySubject, Subject} from "rxjs";
import {BreakModel} from "../models/break-model";
import {HttpClient} from "@angular/common/http";
import {CallModel} from "../models/call-model";
import {IssueModel} from "../models/issue-model";

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerService {

  timeTracker: TimeTrackerModel = new TimeTrackerModel();
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
        this.timeTracker$.next(this.timeTracker);
      });
  }

  saveTimeTracker(timeTracker: TimeTrackerModel) {
    combineLatest(this.timeTracker.list.map((item) => this.deleteItem(item)))
      .subscribe(() => {
        combineLatest(timeTracker.list.map((item) => this.saveItem(item)))
          .subscribe((results) => {
            const result = results.every((item) => item);
            console.log(result);
          });
      })
  }

  deleteItem(timeTrackerItem: BreakModel) {
    return this.httpClient.delete(this.URL + '/' + timeTrackerItem.uid)
      .pipe(
        map(() => true),
        catchError((error) => {
          console.error(error);
          return of(false);
        }),
      );
  }

  saveItem(timeTrackerItem: BreakModel): Observable<boolean> {
    return this.httpClient.post(this.URL, timeTrackerItem)
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
}
