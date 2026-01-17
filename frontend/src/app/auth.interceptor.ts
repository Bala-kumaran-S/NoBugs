import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        console.error('HTTP Error:', error.status, error.message);

        // Unauthorized → token expired / invalid
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }

        // Forbidden → role problem
        else if (error.status === 403) {
          this.router.navigate(['/forbidden']);
        }

        // Server crash
        else if (error.status === 500) {
          this.router.navigate(['/error'], {
            queryParams: { code: 500 }
          });
        }

        // Network / backend down
        else if (error.status === 0) {
          alert('Backend unreachable. Please try again later.');
        }

        return throwError(() => error);
      })
    );
  }
}
