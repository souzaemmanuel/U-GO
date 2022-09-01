import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '@u-go/services';
import { BookedFlight, Flight, SearchFlightsFilter } from '@u-go/models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'u-go-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit, OnDestroy {
  readonly emptyListMessage: string =
    'No flights were found! Please do a new search using different filters!';

  readonly errorMessage: string =
    'Some error occurs, please try again in some minutes!';

  filter: SearchFlightsFilter = {
    from: '',
    to: '',
    budget: '',
  };

  flights: Flight[] = [];

  bookedFlight: BookedFlight | undefined;

  showBookingModal = false;

  showEmptyState = false;

  showErrorState = false;

  onDestroy$ = new Subject<boolean>();

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
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        (flights: Flight[]) => {
          this.flights = flights;
          this.showErrorState = false;
          if (this.flights.length > 0) {
            this.showEmptyState = false;
          } else {
            this.showEmptyState = true;
          }
        },
        () => {
          this.showErrorState = true;
          this.showEmptyState = false;
        }
      );
  }

  bookFlight(flightId: string): void {
    this.flightService
      .bookFlight(flightId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((bookedFlight: BookedFlight) => {
        this.showBookingModal = true;
        this.bookedFlight = bookedFlight;
      });
  }

  goToCustomerHome(): void {
    this.router.navigate(['customer/home']);
  }

  book(id: string) {
    this.bookFlight(id);
  }

  setCurrentModalState(showBookingModal: boolean): void {
    this.showBookingModal = showBookingModal;
    //do again the search or goback
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
