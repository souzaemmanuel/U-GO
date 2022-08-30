import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthUser } from '@u-go/models';

@Component({
  selector: 'u-go-flights-search',
  templateUrl: './flights-search.component.html',
  styleUrls: ['./flights-search.component.scss'],
})
export class FlightsSearchComponent {
  @Output() submitForm = new EventEmitter<any>();

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
}
