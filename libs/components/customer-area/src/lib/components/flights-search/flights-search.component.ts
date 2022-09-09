import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Airport, AirportSearchResponse } from '@u-go/models';
import { FlightService } from '@u-go/services';

@Component({
  selector: 'u-go-flights-search',
  templateUrl: './flights-search.component.html',
  styleUrls: ['./flights-search.component.scss'],
})
export class FlightsSearchComponent {
  @Output() submitForm = new EventEmitter<any>();

  arrivalAirports: Airport[] = [];
  departureAirports: Airport[] = [];
  isLoadingFrom = false;
  isLoadingTo = false;
  readonly keyword = 'fullName';

  constructor(private flightService: FlightService) {}

  flightForm: FormGroup = new FormGroup({
    from: new FormControl('', [Validators.required, Validators.minLength(3)]),
    to: new FormControl('', [Validators.required, Validators.minLength(3)]),
    budget: new FormControl('', [Validators.required]),
  });

  searchFlights() {
    if (this.flightForm.valid) {
      this.submitForm.emit({
        from: this.flightForm.value.from,
        to: this.flightForm.value.to,
        budget: this.flightForm.value.budget,
      });
    }
  }

  selectOption(airport: Airport, field: string) {
    this.flightForm.get(field)?.setValue(airport.iata);
  }

  onChangeSearch(search: string, field: string) {
    if (search.length < 3) return;

    this.isLoadingTo = field === 'to';
    this.isLoadingFrom = field === 'from';

    this.flightService
      .searchAirports(search)
      .subscribe((response: AirportSearchResponse) => {
        this.isLoadingFrom = this.isLoadingTo = false;

        if (response?.airports?.length) {
          response.airports.map(
            (airport) =>
              (airport.fullName = `${airport.iata} - ${airport.city}`)
          );

          if (field === 'to') {
            this.arrivalAirports = response.airports;
          }
          if (field === 'from') {
            this.departureAirports = response.airports;
          }
        } else this.departureAirports = this.arrivalAirports = [];
      });
  }

  clearValue(field: string) {
    this.flightForm.get(field)?.setValue('');
    this.departureAirports = [];
  }
}
