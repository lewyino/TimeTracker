import {BreakModel} from "./break-model";

export class IssueModel extends BreakModel {
  comment: string = '';
  id: string = '';

  constructor(opts: Partial<IssueModel> = {}) {
    super(opts);
    this.comment = opts.comment || '';
    this.comment = opts.id || '';
  }
}
