import {Component, Input, OnInit} from '@angular/core';
import {BreakModel} from "../../models/break-model";
import {IssueModel} from "../../models/issue-model";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  @Input('issueModel') _issueModel: BreakModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  get issueModel(): IssueModel {
    return this._issueModel as IssueModel;
  }

}
