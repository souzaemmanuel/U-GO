import { Component, Input, OnInit } from '@angular/core';
import { flight } from '@u-go/models';

@Component({
  selector: 'u-go-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss'],
})
export class FlightsListComponent implements OnInit {
  @Input() flights: flight[] = [];

  constructor() {}

  ngOnInit(): void {}
}
