import { Injectable } from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {TimeTrackerService} from "../time-tracker.service";

@Injectable({
  providedIn: 'root'
})
export class IdValidatorService implements AsyncValidator {

  constructor(private timeTrackerService: TimeTrackerService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.timeTrackerService.getItemById(control.value)
      .pipe(
        map((issue) => issue ? { uniqueId: false } : null)
      )
  }
}
