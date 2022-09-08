import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoadingService, SnackbarService } from '@u-go/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private snackbarService: SnackbarService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(({ error }) => {
        this.loadingService.loading = false;

        if (error.message instanceof Array) {
          this.snackbarService.showError(error.message[0]);
        } else {
          this.snackbarService.showError(error.message);
        }

        return throwError(error);
      })
    );
  }
}
