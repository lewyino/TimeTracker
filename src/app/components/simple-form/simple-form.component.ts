import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleFormSubmit(form: NgForm) {
    if (form.valid) {
      // send data to server
      console.log(form.value);
    }
  }
}
