import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  handleFormSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.login(form.value.login, form.value.password);
    }
  }
}
