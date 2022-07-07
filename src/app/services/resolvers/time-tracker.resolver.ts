import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {mergeMap, Observable, of, pipe, timer} from 'rxjs';
import {TimeTrackerModel} from "../../models/time-tracker-model";
import {TimeTrackerService} from "../time-tracker.service";

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerResolver implements Resolve<TimeTrackerModel> {
  constructor(private timeTrackerService: TimeTrackerService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TimeTrackerModel> {
    return this.timeTrackerService.getTimeTracker();
  }
}
