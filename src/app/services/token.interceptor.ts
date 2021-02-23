import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  private authService: DataService;
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(DataService);
    const token: string = this.authService.getToken();
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // give focus
    return next.handle(request)
      .pipe(catchError((response: any) => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
          console.log(response);
          localStorage.removeItem('token');
          this.router.navigateByUrl('/log-in');
        }
        return Observable.throw(response);
      }));
  }
}
// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     return next.handle(request)
//       .catch((response: any) => {
//         if (response instanceof HttpErrorResponse && response.status === 401) {
//           localStorage.removeItem('token');
//           this.router.navigateByUrl('/log-in');
//         }
//         return Observable.throw(response);
//       });
//   }
// }