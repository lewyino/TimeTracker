import {AbstractControl, ValidationErrors} from "@angular/forms";

export const durationValidator = (control: AbstractControl): ValidationErrors | null => {
  const values = control.value.trim().split(' ');
  console.log(values);
  const error = values.some((value: string) => {
    const res = !/\d{1,2}[dhms]/.test(value);
    console.log(value, res);
    return res;
  });
  if (error) {
    return {duration: false}
  }
  return null;
}
