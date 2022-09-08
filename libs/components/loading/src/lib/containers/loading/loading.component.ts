import { Component } from '@angular/core';
import { LoadingService } from '@u-go/services';

@Component({
  selector: 'u-go-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
