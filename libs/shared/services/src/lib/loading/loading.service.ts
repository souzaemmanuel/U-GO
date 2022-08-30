import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private static loading = false;

  set loading(loading: boolean) {
    LoadingService.loading = loading;
  }
  get loading(): boolean {
    return LoadingService.loading;
  }
}
