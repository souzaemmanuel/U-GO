import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@u-go/services';
import { SearchFlightsFilter } from '@u-go/models';

@Component({
  selector: 'u-go-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {}

  searchFlights(filter: SearchFlightsFilter): void {
    this.router.navigate([
      `customer/flights-list/${filter.from}/${filter.to}/${filter.budget}`,
    ]);
  }

  logout() {
    this.authService.logout();
  }
}
