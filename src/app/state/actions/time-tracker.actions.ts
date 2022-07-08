import {createAction, props} from "@ngrx/store";
import {TimeTrackerModel} from "../../models/time-tracker-model";

export const timeTrackerLoadData = createAction(
  '[TimeTracker] loadData'
);

export const timeTrackerLoadDataSuccess = createAction(
  '[TimeTracker] loadDataSuccess',
  props<TimeTrackerModel>(),
)

export const timeTrackerLoadDataFailed = createAction(
  '[TimeTracker] loadDataFailed'
)
