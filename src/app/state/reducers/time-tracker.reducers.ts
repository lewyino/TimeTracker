import {TimeTrackerModel} from "../../models/time-tracker-model";
import {createReducer, on} from "@ngrx/store";
import {
  timeTrackerLoadData,
  timeTrackerLoadDataFailed,
  timeTrackerLoadDataSuccess
} from "../actions/time-tracker.actions";

export interface TimeTrackerState {
  timeTracker: TimeTrackerModel | null,
  loading: boolean;
}

const initState: TimeTrackerState = {
  timeTracker: null,
  loading: false,
}

export const timeTrackerReducers = createReducer(
  initState,
  on(timeTrackerLoadDataSuccess, (state, payload) => {
    return {
      ...state,
      loading: false,
      timeTracker: payload,
    }
  }),
  on(timeTrackerLoadData, (state) => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(timeTrackerLoadDataFailed, (state) => {
    return {
      ...state,
      loading: false,
    }
  })
);
