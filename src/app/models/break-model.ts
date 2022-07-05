import { v4 as uuidv4 } from 'uuid';

export class BreakModel {
  duration: string = '';
  uid: string;

  constructor(opts: Partial<BreakModel> = {}) {
    this.uid = opts.uid || uuidv4();
    this.duration = opts.duration || '0m';
  }
}
