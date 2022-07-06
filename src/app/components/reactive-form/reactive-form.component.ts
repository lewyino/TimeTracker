import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', Validators.required],
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
}
