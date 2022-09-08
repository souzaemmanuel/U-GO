import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '@u-go/models';

@Component({
  selector: 'u-go-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss'],
})
export class FlightsListComponent {
  @Input() flights: Flight[] = [];
  @Output() bookFlight: EventEmitter<string> = new EventEmitter();

  book(id: string) {
    this.bookFlight.emit(id);
  }
}
