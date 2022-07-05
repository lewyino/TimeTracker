import { v4 as uuidv4 } from 'uuid';

export class BreakModel {
  duration: string = '';
  uid: string;

  constructor() {
    this.uid = uuidv4();
  }
}
