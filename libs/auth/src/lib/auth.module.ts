import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterAccountComponent } from './components/register-account/register-account.component';
import { RegisterComponent } from './containers/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

export const authRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    RegisterAccountComponent,
    RegisterComponent,
  ],
})
export class AuthModule {}
