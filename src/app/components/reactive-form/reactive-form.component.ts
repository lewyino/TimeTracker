import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

function rangeValidator(min: number, max: number) {
  return (control: AbstractControl) => {
    const value = Number(control.value);
    if (isNaN(value)) {
      return { range: { value: 'is not a number'}}
    }
    if (min > value || value > max) {
      return { range: {value: `is out of range ${min}-${max}`}}
    }
    return null;
  }
}

const peselValidator = (control: AbstractControl) => {
  return null;
}

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   firstname: new FormControl('', )
    // });
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), peselValidator]],
      login: ['', Validators.pattern(/[A-Z]+/)],
      number: ['', rangeValidator(3, 300)],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        city: 'Poznań',
        street: ''
      }),
    });
  }

  handleFormSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // send data to server
      console.log(this.form.value);
    }
  }

  get firstnameForm() {
    return this.form.get('firstname');
  }
  get numberForm() {
    return this.form.get('number');
  }
  get loginForm() {
    return this.form.get('login');
  }
}
