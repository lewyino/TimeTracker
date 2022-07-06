import {Component, Input, OnInit} from '@angular/core';
import {BreakModel} from "../../models/break-model";
import {IssueModel} from "../../models/issue-model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {durationValidator} from "../../utils/validator.utils";
import {IdValidatorService} from "../../services/validators/id-validator.service";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  @Input('issueModel') _issueModel: BreakModel | undefined;
  @Input('form') set _form(form: AbstractControl) {
    this.form = form as FormGroup;
  }
  form!: FormGroup;

  constructor(private idValidatorService: IdValidatorService) { }

  ngOnInit(): void {
    this.form.addControl('duration',
      new FormControl(this.issueModel.duration, [Validators.required, durationValidator], []));
    this.form.addControl('comment', new FormControl(this.issueModel.comment, Validators.required));
    this.form.addControl('id',
      new FormControl(this.issueModel.id, Validators.required, this.idValidatorService.validate.bind(this.idValidatorService)))
  }

  get issueModel(): IssueModel {
    return this._issueModel as IssueModel;
  }

}
