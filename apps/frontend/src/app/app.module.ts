import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { authRoutes, AuthModule } from '@u-go/auth';
import { LoadingModule } from '@u-go/loading';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AuthInterceptor,
  InterceptorsModule,
  RequestInterceptor,
  ErrorInterceptor,
} from '@u-go/interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    LoadingModule,
    BrowserModule,
    RouterModule.forRoot([{ path: 'auth', children: authRoutes }]),
    AuthModule,
    InterceptorsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
