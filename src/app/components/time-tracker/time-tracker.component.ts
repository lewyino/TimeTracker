import { Component, OnInit } from '@angular/core';
import {TimeTrackerModel} from "../../models/time-tracker-model";
import {IssueModel} from "../../models/issue-model";
import {BreakModel} from "../../models/break-model";
import {CallModel} from "../../models/call-model";
import {TimeTrackerType} from "../../models/time-tracker-type";
import {getModel} from "../../utils/type.utils";
import {TimeTrackerService} from "../../services/time-tracker.service";
import {debounceTime, distinct, filter, map, Observable, takeWhile, tap} from "rxjs";

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {

  // timeTracker: TimeTrackerModel | undefined;
  timeTracker$: Observable<TimeTrackerModel> | undefined;
  subscription = true;

  constructor(private timeTrackerService: TimeTrackerService) { }

  ngOnInit(): void {
    this.timeTracker$ = this.timeTrackerService.getTimeTracker()
      .pipe(
        map((data:TimeTrackerModel) => data),
        filter((data) => !!data),
      );
    this.timeTrackerService.loadData();
  }

  ngOnDestroy() {
    this.subscription = false;
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
    this.timeTrackerService.addItem(type);
  }

  handleRemoveItem(uid: string) {
    this.timeTrackerService.removeItem(uid);
  }
}
