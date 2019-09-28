// import { Injectable } from '@angular/core';

// import { tap } from 'rxjs/operators';
// import { AuthService } from '.././auth.service';
// import {
//     HttpRequest,
//     HttpHandler,
//     HttpEvent,
//     HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { HttpResponse, HttpErrorResponse } from '@angular/common/http/';
// import { Router } from '@angular/router';

// @Injectable({
//     providedIn: 'root'
//   })
// export class JwtInterceptor implements HttpInterceptor {
//     constructor(
//         public auth: AuthService,
//         private router: Router
//     ) { }
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(request).pipe(
//             tap(
//                 (event: HttpEvent<any>) => {
//                     if (event instanceof HttpResponse) {
//                         // do stuff with response if you want
//                     }
//                 },
//                 (err: any) => {
//                     if (err instanceof HttpErrorResponse) {
//                         if (err.status === 401) {
//                             // redirect to the login route
//                             // or show a modal
//                             this.router.navigate(['login']);
//                         }
//                     }
//                 }
//             )
//         );
//     }
// }

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http/';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService,
    private router: Router
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              let response = event as HttpResponse<any>;
                // this.errorDialogService.openDialog(event);
                return response;
            } else {
              return event;
            }
        }),
        catchError((error: HttpErrorResponse) => {
            let data = {};
            data = {
                reason: error && error.error.reason ? error.error.reason : '',
                status: error.status
            };
            return throwError(error);
        }));
  }
}
