import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '@u-go/models';
import { AuthService } from '@u-go/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'u-go-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  onDestroy$ = new Subject<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  login(AuthUser: AuthUser): void {
    this.authService
      .login(AuthUser)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.router.navigate(['customer/home']);
      });
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }
}
