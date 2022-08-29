import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RequestInterceptor } from './request/request.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [AuthInterceptor, RequestInterceptor],
})
export class InterceptorsModule {}
