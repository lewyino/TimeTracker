import {Component, Input, OnInit} from '@angular/core';
import {CallModel} from "../../models/call-model";
import {BreakModel} from "../../models/break-model";

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  @Input('callModel') _callModel: BreakModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  get callModel(): CallModel {
    return this._callModel as CallModel;
  }

}
