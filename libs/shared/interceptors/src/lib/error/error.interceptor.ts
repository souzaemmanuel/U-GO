import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoadingService } from '../../../../services/src';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        this.loadingService.loading = false;

        //insert toaster here!!
        console.error(
          `Stack: ${JSON.stringify(error)} \n Request: ${JSON.stringify(
            request
          )}`
        );
        return throwError(error);
      })
    );
  }
}
