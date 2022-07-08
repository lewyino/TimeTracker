import {createSelector} from "@ngrx/store";
import {TimeTrackerAppState} from "../reducers";
import {TimeTrackerState} from "../reducers/time-tracker.reducers";

export const selectTimeTrackerState = (state: TimeTrackerAppState) => state.timeTracker;

export const selectTimeTracker = createSelector(
  selectTimeTrackerState,
  (state: TimeTrackerState) => state.timeTracker
);

export const selectTimeTrackerLoading = createSelector(
  selectTimeTrackerState,
  (state: TimeTrackerState) => state.loading
);
