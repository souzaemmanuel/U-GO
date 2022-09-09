import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
const DEFAULT_CONFIG = {
  timeOut: 3000,
  positionClass: 'toast-bottom-right',
  preventDuplicates: true,
};
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private toastr: ToastrService) {}

  showSuccess(title: string, message: string) {
    this.toastr.success(message, title, DEFAULT_CONFIG);
  }

  showError(message: string) {
    this.toastr.error(message, '', DEFAULT_CONFIG);
  }

  showInfo(title: string, message: string) {
    this.toastr.info(message, title, DEFAULT_CONFIG);
  }
}
