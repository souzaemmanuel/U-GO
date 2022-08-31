import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'u-go-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() alertMessage: string = '';
}
