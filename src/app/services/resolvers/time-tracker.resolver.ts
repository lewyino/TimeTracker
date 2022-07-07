import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {filter, Observable} from 'rxjs';
import {TimeTrackerModel} from "../../models/time-tracker-model";
import {TimeTrackerService} from "../time-tracker.service";

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerResolver implements Resolve<TimeTrackerModel | null> {
  constructor(private timeTrackerService: TimeTrackerService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TimeTrackerModel | null> {
    this.timeTrackerService.loadData();
    return this.timeTrackerService.getTimeTracker()
      .pipe(
        filter((data) => !!data),
      );
  }
}
