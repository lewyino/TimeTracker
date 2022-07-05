import {BreakModel} from "./break-model";

export class CallModel extends BreakModel {
  comment: string = '';

  constructor(opts: Partial<CallModel> = {}) {
    super(opts);
    this.comment = opts.comment || '';
  }
}
