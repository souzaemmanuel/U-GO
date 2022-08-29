import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { LoadingService } from './loading/loading.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService, LoadingService],
})
export class ServicesModule {}
