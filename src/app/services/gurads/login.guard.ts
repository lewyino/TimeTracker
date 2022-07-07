import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userService.redirectUrl = route.url;
    return this.userService.isLogged() ? true : this.router.parseUrl('/login');
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
