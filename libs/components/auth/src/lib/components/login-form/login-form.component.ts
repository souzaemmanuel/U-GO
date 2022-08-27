import { Component, EventEmitter, Output } from '@angular/core';
import { AuthUser } from '@u-go/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'u-go-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() submitForm = new EventEmitter<any>();

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.submitForm.emit({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    });
  }
}
