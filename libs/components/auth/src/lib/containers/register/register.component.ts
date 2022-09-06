import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CreateAccount } from '@u-go/models';
import { AuthService } from '@u-go/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'u-go-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  onDestroy$ = new Subject<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  createAccount(account: CreateAccount): void {
    this.authService
      .createAccount(account)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        alert('User created successfully!');
        this.router.navigate(['auth/login']);
      });
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }
}
