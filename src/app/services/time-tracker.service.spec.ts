import {TestBed} from "@angular/core/testing";
import {TimeTrackerService} from "./time-tracker.service";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import mock from '@mocks/db-mock.json';
import {CallModel} from "../models/call-model";
import {IssueModel} from "../models/issue-model";

describe('TimeTrackerService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: TimeTrackerService;

  beforeEach(() => {
    console.log(mock);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(of(mock));
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(TimeTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('TimeTracker list should contains elements', () => {
    service.loadData();
    service.getTimeTracker().subscribe((timeTracker) => {
      expect(service.timeTracker.list.length).toBe(5);
    });
  });

  it('TimeTracker list should contains 3 break elements', () => {
    service.loadData();
    service.getTimeTracker().subscribe((timeTracker) => {
      const breaks = service.timeTracker.list
        .filter((item) => !(item instanceof CallModel || item instanceof IssueModel));
      expect(breaks.length).toBe(3);
    });
  });
});
