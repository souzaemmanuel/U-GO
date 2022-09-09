import { Component, Input } from '@angular/core';

@Component({
  selector: 'u-go-search-feedback',
  templateUrl: './search-feedback.component.html',
  styleUrls: ['./search-feedback.component.scss'],
})
export class SearchFeedbackComponent {
  @Input() alertMessage: string = '';
}
