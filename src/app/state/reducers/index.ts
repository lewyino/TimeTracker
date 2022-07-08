import {TimeTrackerModel} from "../../models/time-tracker-model";
import {timeTrackerReducers, TimeTrackerState} from "./time-tracker.reducers";
import {createReducer} from "@ngrx/store";

export interface TimeTrackerAppState {
  timeTracker: TimeTrackerState
}

export const appState = createReducer({
  timeTracker: timeTrackerReducers
});


