import { Injectable } from '@angular/core';
import {TimeTrackerModel} from "../models/time-tracker-model";
import {TimeTrackerType} from "../models/time-tracker-type";
import {getModel} from "../utils/type.utils";
import {BehaviorSubject, catchError, filter, Observable, of, ReplaySubject, Subject} from "rxjs";
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
}
