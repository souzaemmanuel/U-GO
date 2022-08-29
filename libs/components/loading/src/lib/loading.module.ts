import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './containers/loading/loading.component';
import { ServicesModule } from '@u-go/services';

@NgModule({
  imports: [CommonModule, ServicesModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
})
export class LoadingModule {}
