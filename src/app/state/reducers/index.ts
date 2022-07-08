import {TimeTrackerModel} from "../../models/time-tracker-model";
import {timeTrackerReducers, TimeTrackerState} from "./time-tracker.reducers";
import {Action, ActionReducerMap, createReducer} from "@ngrx/store";

export interface TimeTrackerAppState {
  timeTrackerState: TimeTrackerState
}

export const appState: ActionReducerMap<TimeTrackerAppState> = {
  timeTrackerState: timeTrackerReducers
};


