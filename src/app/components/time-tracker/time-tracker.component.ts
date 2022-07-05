import { Component, OnInit } from '@angular/core';
import {TimeTrackerModel} from "../../models/time-tracker-model";
import {IssueModel} from "../../models/issue-model";
import {BreakModel} from "../../models/break-model";
import {CallModel} from "../../models/call-model";
import {TimeTrackerType} from "../../models/time-tracker-type";
import {getModel} from "../../utils/type.utils";

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {

  timeTracker: TimeTrackerModel = new TimeTrackerModel();

  constructor() { }

  ngOnInit(): void {
    this.timeTracker.list = [
      new CallModel(),
      new BreakModel(),
      new BreakModel(),
      new IssueModel(),
    ]
  }

  getType(type: BreakModel): TimeTrackerType {
    if (type instanceof CallModel) {
      return 'call';
    }
    if (type instanceof IssueModel) {
      return 'issue';
    }
    return "break";
  }

  addTimeTrackerItem(type: TimeTrackerType) {
    this.timeTracker.list.push(getModel(type));
  }

  handleRemoveItem(uid: string) {
    this.timeTracker.list =
      this.timeTracker.list
        .filter((item) => item.uid !== uid)
  }
}
