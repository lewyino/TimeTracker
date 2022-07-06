import {Component, Input, OnInit} from '@angular/core';
import {CallModel} from "../../models/call-model";
import {BreakModel} from "../../models/break-model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  @Input('callModel') _callModel: BreakModel | undefined;
  @Input('form') set _form(form: AbstractControl) {
    this.form = form as FormGroup;
  }
  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form.addControl('duration', new FormControl(this.callModel.duration, Validators.required));
    this.form.addControl('comment', new FormControl(this.callModel.comment, Validators.required));
  }

  get callModel(): CallModel {
    return this._callModel as CallModel;
  }

}
