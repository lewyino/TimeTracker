import {Component, Input, OnInit} from '@angular/core';
import {BreakModel} from "../../models/break-model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-break',
  templateUrl: './break.component.html',
  styleUrls: ['./break.component.scss']
})
export class BreakComponent implements OnInit {

  @Input() breakModel: BreakModel | undefined;
  @Input('form') set _form(form: AbstractControl) {
    this.form = form as FormGroup;
  }
  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form.addControl('duration', new FormControl(this.breakModel?.duration, Validators.required));
  }

}
