import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '@u-go/services';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isUserLoggedIn()) {
      if (state.url.includes('customer')) {
        return true;
      }
      this.router.navigate(['customer/home']);
      return false;
    } else {
      if (state.url.includes('auth')) {
        return true;
      }
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
