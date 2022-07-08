import {Component, OnInit} from '@angular/core';
import {TimeTrackerModel} from "../../models/time-tracker-model";
import {IssueModel} from "../../models/issue-model";
import {BreakModel} from "../../models/break-model";
import {CallModel} from "../../models/call-model";
import {TimeTrackerType} from "../../models/time-tracker-type";
import {TimeTrackerService} from "../../services/time-tracker.service";
import {filter, map, Observable, of, tap} from "rxjs";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {getModel, getType} from "../../utils/type.utils";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectTimeTracker, selectTimeTrackerLoading} from "../../state/selectors/time-tracker.selectors";
import {timeTrackerLoadData, timeTrackerLoadDataFailed} from "../../state/actions/time-tracker.actions";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {

  timeTracker$!: Observable<TimeTrackerModel | null>;
  subscription = true;
  form!: FormArray;
  formSend = false;
  formMap = new Map<string, FormGroup>();
  date = new Date();

  loading$!: Observable<boolean>;
  error = '';

  constructor(private timeTrackerService: TimeTrackerService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private store: Store,
              private actions$: Actions) { }

  ngOnInit(): void {
    this.form = this.fb.array([]);
    this.loading$ = this.store.select(selectTimeTrackerLoading)
      .pipe(tap((loading) => {
        console.log(loading);
      }))
    this.timeTracker$ = this.store.select(selectTimeTracker)
      .pipe(
        map((data: TimeTrackerModel | null) => data),
        filter((data) => !!data),
        tap((data) => {
          data?.list.forEach((item) => {
            if (!this.formMap.has(item.uid)) {
              const form = this.fb.group({
                uid: item.uid,
                type: getType(item),
              });
              this.formMap.set(item.uid, form);
              this.form.push(form);
            }
          });
          // console.log(this.form);
        })
      );
    this.actions$.pipe(
      ofType(timeTrackerLoadDataFailed)
    )
      .subscribe(() => {
        this.error = 'ładowanie danych nie powiodło się';
      })
  }

  ngOnDestroy() {
    this.subscription = false;
  }

  getType = getType;

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
    const timeTracker = new TimeTrackerModel();
    timeTracker.list = this.form.value.map((item: any) => getModel(item.type, item));
    this.timeTrackerService.saveTimeTracker(timeTracker)
      .subscribe((result) => {
        console.log('save in db;', result);
        this.timeTrackerService.loadData();
      });
  }

  startLoading() {
    this.store.dispatch(timeTrackerLoadData());
  }
}
