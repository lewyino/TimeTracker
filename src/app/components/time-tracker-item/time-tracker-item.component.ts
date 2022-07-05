import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BreakModel} from "../../models/break-model";

@Component({
  selector: 'app-time-tracker-item',
  templateUrl: './time-tracker-item.component.html',
  styleUrls: ['./time-tracker-item.component.scss']
})
export class TimeTrackerItemComponent implements OnInit {

  @Input() uid: string = '';
  @Output() removeItem: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteTimeTrackerItem() {
    this.removeItem.emit(this.uid);
  }
}
