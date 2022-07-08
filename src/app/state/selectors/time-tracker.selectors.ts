import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TimeTrackerAppState} from "../reducers";
import {TimeTrackerState} from "../reducers/time-tracker.reducers";

export const timeTrackerFeatureName = 'timeTrackerState';

export const selectTimeTrackerState = createFeatureSelector<TimeTrackerState>(timeTrackerFeatureName)

export const selectTimeTracker = createSelector(
  selectTimeTrackerState,
  (state: TimeTrackerState) => state.timeTracker
);

export const selectTimeTrackerLoading = createSelector(
  selectTimeTrackerState,
  (state: TimeTrackerState) => state.loading
);
