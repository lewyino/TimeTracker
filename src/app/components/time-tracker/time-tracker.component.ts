import {Component, OnInit} from '@angular/core';
import {TimeTrackerModel} from "../../models/time-tracker-model";
import {IssueModel} from "../../models/issue-model";
import {BreakModel} from "../../models/break-model";
import {CallModel} from "../../models/call-model";
import {TimeTrackerType} from "../../models/time-tracker-type";
import {TimeTrackerService} from "../../services/time-tracker.service";
import {filter, map, Observable, tap} from "rxjs";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {

  timeTracker$!: Observable<TimeTrackerModel>;
  subscription = true;
  form!: FormArray;
  formSend = false;
  formMap = new Map<string, FormGroup>();

  constructor(private timeTrackerService: TimeTrackerService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.array([]);
    this.timeTracker$ = this.timeTrackerService.getTimeTracker()
      .pipe(
        map((data:TimeTrackerModel) => data),
        filter((data) => !!data),
        tap((data) => {
          data.list.forEach((item) => {
            if (!this.formMap.has(item.uid)) {
              const form = this.fb.group({
                uid: item.uid,
                type: this.getType(item),
              });
              this.formMap.set(item.uid, form);
              this.form.push(form);
            }
          });
          console.log(this.form);
        })
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

  handleRemoveItem(uid: string, index: number) {
    this.timeTrackerService.removeItem(uid);
    this.form.removeAt(index);
    this.formMap.delete(uid);
  }

  handleSendForm() {
    this.formSend = true;
    console.log(this.form.value);
  }
}
