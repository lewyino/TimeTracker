import {AbstractControl, ValidationErrors} from "@angular/forms";

export const durationValidator = (control: AbstractControl): ValidationErrors | null => {
  const values = control.value.trim().split(' ');
  const error = values.some((value: string) => {
    return !/\d{1,2}[dhms]/.test(value);
  });
  if (error) {
    return {duration: false}
  }
  return null;
}
