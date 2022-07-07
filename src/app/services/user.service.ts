import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router, UrlSegment} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  redirectUrl: UrlSegment[] | null = null;

  private userLogged = false;

  private readonly URL = environment.SERVER_API + '/users';

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  isLogged() {
    return this.userLogged;
  }

  login(login: string, password: string) {
    this.httpClient.get<any[]>(this.URL, {
      params: {
        login,
        password
      }
    })
      .subscribe((users) => {
        this.userLogged = users.length > 0;
        if (this.redirectUrl) {
          this.router.navigate(this.redirectUrl.map((u) => u.path));
        }
      })
  }

  logout() {
    this.userLogged = false;
  }
}
