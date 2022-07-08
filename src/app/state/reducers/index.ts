import {TimeTrackerModel} from "../../models/time-tracker-model";
import {timeTrackerReducers, TimeTrackerState} from "./time-tracker.reducers";
import {Action, ActionReducerMap, createReducer} from "@ngrx/store";
import {timeTrackerFeatureName} from "../selectors/time-tracker.selectors";

export interface TimeTrackerAppState {
  [timeTrackerFeatureName]: TimeTrackerState,

}

export const appState: ActionReducerMap<TimeTrackerAppState> = {
  [timeTrackerFeatureName]: timeTrackerReducers
};


