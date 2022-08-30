import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'u-go-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss'],
})
export class RegisterAccountComponent {
  @Output() submitForm = new EventEmitter<any>();

  accountForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  createAccount() {
    if (this.accountForm.valid) {
      this.submitForm.emit({
        email: this.accountForm.value.email,
        password: this.accountForm.value.password,
        name: this.accountForm.value.name,
      });
    }
  }
}
