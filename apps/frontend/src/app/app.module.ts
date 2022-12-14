import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { authRoutes, AuthModule } from '@u-go/auth';
import { LoadingModule } from '@u-go/loading';
import { AuthGuard, GuardsModule } from '@u-go/guards';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AuthInterceptor,
  InterceptorsModule,
  RequestInterceptor,
  ErrorInterceptor,
} from '@u-go/interceptors';
import { CustomerPortalModule, customerRoutes } from '@u-go/customer-area';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes = [
  { path: 'auth', children: authRoutes, canActivate: [AuthGuard] },
  { path: 'customer', children: customerRoutes, canActivate: [AuthGuard] },
  {
    path: '**',
    redirectTo: 'customer/home',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    GuardsModule,
    CustomerPortalModule,
    LoadingModule,
    BrowserModule,
    RouterModule.forRoot(routes),
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
