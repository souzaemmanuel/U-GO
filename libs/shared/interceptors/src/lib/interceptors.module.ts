import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [AuthInterceptor],
})
export class InterceptorsModule {}
