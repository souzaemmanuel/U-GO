import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { LoadingService } from './loading/loading.service';
import { SnackbarService } from './snackbar/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, MatButtonModule, MatIconModule],
  exports: [MatSnackBarModule, MatButtonModule, MatIconModule],
  providers: [AuthService, LoadingService, SnackbarService],
})
export class ServicesModule {}
