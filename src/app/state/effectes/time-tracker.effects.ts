import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TimeTrackerService} from "../../services/time-tracker.service";
import {catchError, map, mergeMap, of} from "rxjs";
import {
  timeTrackerLoadData,
  timeTrackerLoadDataFailed,
  timeTrackerLoadDataSuccess
} from "../actions/time-tracker.actions";
import {getModel} from "../../utils/type.utils";
import {TimeTrackerModel} from "../../models/time-tracker-model";


@Injectable()
export class TimeTrackerEffects {

  loadTimeTrackerData$ = createEffect(() => this.actions$.pipe(
    ofType(timeTrackerLoadData),
    mergeMap(() => this.timeTrackerService.getData()
      .pipe(
        map((payload) => {
          const timeTrackerModel = new TimeTrackerModel();
          timeTrackerModel.list = payload.map((item) => getModel(item.type, item));
          return timeTrackerLoadDataSuccess(timeTrackerModel);
        }),
        catchError(() => {
          return of(timeTrackerLoadDataFailed());
        }),
      ))
  ));

  constructor(private actions$: Actions,
              private timeTrackerService: TimeTrackerService) {
  }
}
