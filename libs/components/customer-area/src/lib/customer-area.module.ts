import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { Route, RouterModule } from '@angular/router';
import { FlightsSearchComponent } from './components/flights-search/flights-search.component';

export const customerRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HomeComponent, FlightsSearchComponent],
})
export class CustomerPortalModule {}
