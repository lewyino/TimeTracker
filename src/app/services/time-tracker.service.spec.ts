import {TestBed} from "@angular/core/testing";
import {TimeTrackerService} from "./time-tracker.service";
import {map, of, timer} from "rxjs";
import {HttpClient} from "@angular/common/http";
import mock from '@mocks/db-mock.json';
import {CallModel} from "../models/call-model";
import {IssueModel} from "../models/issue-model";

describe('TimeTrackerService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: TimeTrackerService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(timer(1000).pipe(map(() => mock)));
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(TimeTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('TimeTracker list should contains elements', (done) => {
    let data: any = null;
    service.getTimeTracker().subscribe((timeTracker) => {
      if (data !== null && data !== JSON.stringify(timeTracker)) {
        expect(timeTracker?.list.length).toEqual(5);
        done();
      }
      data = JSON.stringify(timeTracker);
    });
    service.loadData();
  });

  it('TimeTracker list should contains 3 break elements', (done) => {
    let data: any = null;
    service.loadData();
    service.getTimeTracker().subscribe((timeTracker) => {
      if (data !== null && data !== JSON.stringify(timeTracker)) {
        const breaks = service.timeTracker.list
          .filter((item) => !(item instanceof CallModel || item instanceof IssueModel));
        expect(breaks.length).toBe(3);
        done();
      }
      data = JSON.stringify(timeTracker);
    });
  });
});
