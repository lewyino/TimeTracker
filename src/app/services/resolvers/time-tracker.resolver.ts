import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {filter, Observable} from 'rxjs';
import {TimeTrackerModel} from "../../models/time-tracker-model";
import {TimeTrackerService} from "../time-tracker.service";
import {Store} from "@ngrx/store";
import {selectTimeTracker} from "../../state/selectors/time-tracker.selectors";
import {timeTrackerLoadData} from "../../state/actions/time-tracker.actions";

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerResolver implements Resolve<TimeTrackerModel | null> {
  constructor(private timeTrackerService: TimeTrackerService,
              private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TimeTrackerModel | null> {
    this.store.dispatch(timeTrackerLoadData());
    return this.store.select(selectTimeTracker)
      .pipe(
        filter((data) => !!data),
      );
  }
}
