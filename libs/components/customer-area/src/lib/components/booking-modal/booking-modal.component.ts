import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookedFlight } from 'libs/shared/models/src/lib/flights.model';

@Component({
  selector: 'u-go-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent {
  @Input() show: boolean = false;
  @Output() currentState: EventEmitter<boolean> = new EventEmitter();

  @Input() bookedFlight: BookedFlight | undefined = {
    airlineName: 'Azul',
    arrivalAirportCode: 'SAO',
    cost: 999.99,
    departureAirportCode: 'RIO',
    departureDate: new Date('2022-12-05T17:00:00.000Z'),
    _id: '630ec867cb2412bba2529323',
    clientName: 'Emanuel',
    duration: '22h 10m 15s',
  };

  toggle() {
    this.show = !this.show;
    this.currentState.emit(this.show);
  }
}
