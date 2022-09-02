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

  @Input() bookedFlight: BookedFlight | undefined;

  toggle() {
    this.show = !this.show;
    this.currentState.emit(this.show);
  }
}
