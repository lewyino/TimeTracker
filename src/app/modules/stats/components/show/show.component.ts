import {Component, OnInit} from '@angular/core';
import {TimeTrackerService} from "../../../../services/time-tracker.service";
import {CallModel} from "../../../../models/call-model";
import {IssueModel} from "../../../../models/issue-model";
import {BreakModel} from "../../../../models/break-model";
import {convertJiraTimeToSec} from "../../../../utils/time-converter.utils";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  avg!: { breaks: number, calls: number, issues: number};

  constructor(private timeTrackerService: TimeTrackerService) { }

  ngOnInit(): void {
    this.timeTrackerService.getTimeTracker()
      .subscribe((timeTracker) => {
        const stats = timeTracker.list.reduce((prev, item) => {
          if (item instanceof IssueModel) {
            prev.issues.push(item);
            return prev;
          }
          if (item instanceof CallModel) {
            prev.calls.push(item);
            return prev;
          }
          prev.breaks.push(item);
          return prev;
        }, {breaks: [] as any[], calls: [] as any[], issues: [] as any[]})
        this.avg = {
          breaks: stats.breaks.reduce(this.reduceTime, 0) / (stats.breaks.length || 1),
          calls: stats.calls.reduce(this.reduceTime, 0) / (stats.calls.length || 1),
          issues: stats.issues.reduce(this.reduceTime, 0) / (stats.issues.length || 1),
        }
      });
    this.timeTrackerService.loadData();
  }

  reduceTime(prev: number, item: BreakModel): number {
    return prev + convertJiraTimeToSec(item.duration);
  }

}
