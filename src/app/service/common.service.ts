import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Result } from '../model/result';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private http: HttpClient,
              private router: Router,
              private messageService: MessageService) { }


  post(url, params): Observable<any> {
    return this.http.post(environment.apiUrl + url, params).pipe(
      tap((result: any) => {
        if (result.errorList && result.errorList.length > 0) {
          result.errorList.forEach((error) => {
            if (error.errorCode === 'E401-XXX') {
              localStorage.removeItem('jwtToken');
              this.router.navigate(['/login']);
            }
            if (error.errorCode === 'E503-XXX') {
              localStorage.removeItem('jwtToken');
              this.router.navigate(['/maintain']);
            }
          });
        }
        return result;
      }),
      catchError(this.handleError<any>('postData'))
    );
  }

  downloadExcel(url, param): Observable<HttpResponse<any>> {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Access-Control-Expose-Headers', ['Content-Disposition', 'X-Total-Count', 'X-Paging-PageSize']);
    headers = headers.append('Access-Control-Allow-Headers', 'Content-Disposition');
    return this.http.post<any>(environment.apiUrl + url, param, { headers, observe: 'response', responseType: 'blob' as 'json' });
  }
  // getFile(url, params): Observable<HttpResponse<Blob>> {
  // 	return this.http.post(environment.apiUrl + url, params, { responseType: ResponseContentType.Blob });
  //  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.error.errorList) {
        error.error.errorList.forEach(errorDetail => {
          this.showError(errorDetail.errMessage);
          if (errorDetail.errorCode === 'E401-XXX') {
            localStorage.removeItem('jwtToken');
            this.router.navigate(['/login']);
          }
          if (errorDetail.errorCode === 'E503-XXX') {
            localStorage.removeItem('jwtToken');
            this.router.navigate(['/maintain']);
          }
        });
        return of(error as T);
      }
    };
  }

  showError(message) {
    this.messageService.add({ severity: 'error', detail: message });
  }
}
