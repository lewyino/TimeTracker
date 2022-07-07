import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {getType} from "../../utils/type.utils";

@Injectable()
export class TypeInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('make request to', req.url);
    if (['POST', 'PUT'].includes(req.method) && req.url.includes('time-tracker-list')) {
      console.log('body before', req.body);
      req = req.clone({
        body: {...req.body, type: getType(req.body)}
      });
      console.log('body after', req.body);
    }
    return next.handle(req);
  }
}
