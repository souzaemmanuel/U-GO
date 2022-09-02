import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { Route, RouterModule } from '@angular/router';
import { FlightsSearchComponent } from './components/flights-search/flights-search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlightsListComponent } from './components/flights-list/flights-list.component';
import { FlightsComponent } from './containers/flights/flights.component';
import { ServicesModule } from '@u-go/services';
import { AlertComponent } from './components/alert/alert.component';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';

export const customerRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'flights-list/:from/:to/:budget', component: FlightsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    ServicesModule,
  ],
  declarations: [
    HomeComponent,
    FlightsSearchComponent,
    FlightsListComponent,
    FlightsComponent,
    AlertComponent,
    BookingModalComponent,
  ],
})
export class CustomerPortalModule {}
