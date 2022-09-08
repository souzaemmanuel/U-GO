import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CreateAccount } from '@u-go/models';
import { AuthService, SnackbarService } from '@u-go/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'u-go-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  onDestroy$ = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  createAccount(account: CreateAccount): void {
    this.authService
      .createAccount(account)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.snackbarService.showSuccess(
          'User created successfully!',
          'Please, login and enter the application'
        );

        this.router.navigate(['auth/login']);
      });
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }
}
