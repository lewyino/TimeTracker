import {TimeTrackerType} from "../models/time-tracker-type";
import {BreakModel} from "../models/break-model";
import {CallModel} from "../models/call-model";
import {IssueModel} from "../models/issue-model";

export function getModel(type: TimeTrackerType, obj: BreakModel): BreakModel {
  switch (type) {
    case "issue": return new IssueModel(obj);
    case "call": return new CallModel(obj);
    default: return new BreakModel(obj);
  }
}
