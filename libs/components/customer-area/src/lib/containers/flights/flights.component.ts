import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '@u-go/services';
import { flight, SearchFlightsFilter } from '@u-go/models';
@Component({
  selector: 'u-go-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  flights: flight[] = [];
  filter: SearchFlightsFilter = {
    from: '',
    to: '',
    budget: '',
  };
  showEmptyState = false;
  showErrorState = false;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({ from, to, budget }) => {
      if (!budget || !to || !from) {
        this.showErrorState = true;
      } else {
        this.filter = {
          from: from,
          to: to,
          budget: budget,
        };

        this.getFlights();
      }
    });
  }

  getFlights(): void {
    this.flightService
      .getFlightsAvailable(this.filter)
      .subscribe((flights: flight[]) => {
        this.flights = flights;
      });
  }

  goToCustomerHome(): void {
    this.router.navigate(['customer/home']);
  }
}
