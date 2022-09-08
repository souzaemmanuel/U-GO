import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { LoadingService } from '../../../../services/src';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  requestWithNoLoading = ['www..com'];
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //Not show full screen loading, when is using autocomplete
    if (!request.url.includes('air-port-codes'))
      this.loadingService.loading = true;

    return next.handle(request).pipe(
      delay(500),
      map<HttpEvent<RequestInterceptor>, HttpEvent<RequestInterceptor>>(
        (event: HttpEvent<RequestInterceptor>) => {
          if (event instanceof HttpResponse) {
            this.loadingService.loading = false;
          }
          return event;
        }
      )
    );
  }
}
