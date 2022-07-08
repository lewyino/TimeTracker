import {TestBed} from "@angular/core/testing";
import {TimeTrackerComponent} from "./time-tracker.component";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import mocks from '@mocks/db-mock.json';
import {TimeTrackerModel} from "../../models/time-tracker-model";
import {TimeTrackerService} from "../../services/time-tracker.service";
import {FormBuilder} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {getModel} from "../../utils/type.utils";

const timeTrackerModelMock = new TimeTrackerModel();
timeTrackerModelMock.list = mocks.map((item: any) => getModel(item.type, item));
const routeMock = {
  data: of({
    timeTrackerData: timeTrackerModelMock,
  }),
}

fdescribe('TimeTrackerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TimeTrackerComponent
      ],
      providers: [
        {provide: ActivatedRoute, useValue: routeMock},
        {provide: TimeTrackerService, useValue: null},
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TimeTrackerComponent);
    expect(fixture).toBeTruthy();
  });

  it('timeTracker$ should contains five elements', () => {
    const fixture = TestBed.createComponent(TimeTrackerComponent);
    fixture.detectChanges();
    fixture.componentInstance.timeTracker$.subscribe((timeTracker) => {
      expect(timeTracker.list.length).toEqual(5);
    });
  });

  it('should render five app-time-tracker-item components', () => {
    const fixture = TestBed.createComponent(TimeTrackerComponent);
    fixture.detectChanges();
    const template = fixture.nativeElement as HTMLElement;
    const components = template.querySelectorAll('app-time-tracker-item');
    expect(components.length).toEqual(5);
  });

  it('should render three app-break components', () => {
    const fixture = TestBed.createComponent(TimeTrackerComponent);
    fixture.detectChanges();
    const template = fixture.nativeElement as HTMLElement;
    const components = template.querySelectorAll('app-break');
    expect(components.length).toEqual(3);
  });

  it('should render one app-issue components', () => {
    const fixture = TestBed.createComponent(TimeTrackerComponent);
    fixture.detectChanges();
    const template = fixture.nativeElement as HTMLElement;
    const components = template.querySelectorAll('app-issue');
    expect(components.length).toEqual(1);
  });

  it('should render one app-call components', () => {
    const fixture = TestBed.createComponent(TimeTrackerComponent);
    fixture.detectChanges();
    const template = fixture.nativeElement as HTMLElement;
    const components = template.querySelectorAll('app-call');
    expect(components.length).toEqual(1);
  });

  it('clock on "Add break" button should add new app-break component', () => {
    const fixture = TestBed.createComponent(TimeTrackerComponent);
    fixture.detectChanges();
    const template = fixture.nativeElement as HTMLElement;
    const button = template.querySelector('#add-break') as HTMLElement;
    const spy = spyOn(fixture.componentInstance, 'addTimeTrackerItem');
    button.click();
    expect(spy).toHaveBeenCalledOnceWith('break');
  });
});
