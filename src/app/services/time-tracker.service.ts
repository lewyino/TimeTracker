import { Injectable } from '@angular/core';
import {TimeTrackerModel} from "../models/time-tracker-model";
import {TimeTrackerType} from "../models/time-tracker-type";
import {getModel} from "../utils/type.utils";

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerService {

  timeTracker: TimeTrackerModel = new TimeTrackerModel();

  constructor() { }

  getTimeTracker() {
    return this.timeTracker;
  }

  addItem(type: TimeTrackerType) {
    this.timeTracker.list.push(getModel(type));
  }

  removeItem(uid: string) {
    this.timeTracker.list =
      this.timeTracker.list
        .filter((item) => item.uid !== uid)
  }
}
