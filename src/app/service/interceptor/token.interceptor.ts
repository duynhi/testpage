import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '.././auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class TokenInterceptor implements HttpInterceptor {
    public static currentTeamId: any;
    constructor(public auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const reqWithCredentials = req.clone({withCredentials: true});
        return next.handle(reqWithCredentials)
         .pipe(
            catchError(error => {
              if (error.status === 401 || error.status === 403) {
                // handle error
              }
              return throwError(error);
            })
         );
      }
}
