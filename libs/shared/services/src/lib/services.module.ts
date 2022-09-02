import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { LoadingService } from './loading/loading.service';
import { SnackbarService } from './snackbar/snackbar.service';
import { FlightService } from './flight/flight.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService, LoadingService, SnackbarService, FlightService],
})
export class ServicesModule {}
