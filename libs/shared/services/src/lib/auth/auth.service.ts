import { Injectable } from '@angular/core';
import { AuthUser, UserToken } from '@u-go/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '@env/frontend';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { SnackbarService } from '@u-go/services';

const AUTH_TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<UserToken>({} as UserToken);
  user$ = this.userSubject$.asObservable();
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  login(user: AuthUser): Observable<UserToken> {
    return this.httpClient
      .post<UserToken>(environment.baseUrl + 'login', user)
      .pipe(
        tap((response: UserToken) => {
          this.saveToken(response.accessToken);

          this.userSubject$.next({
            name: response.name,
            email: response.email,
            accessToken: response.accessToken,
          });

          this.snackbarService.showSuccess(
            `Welcome ${response.name}!`,
            'Now you can search and book flights'
          );
        })
      );
  }

  createAccount(user: AuthUser): Observable<UserToken> {
    return this.httpClient.post<UserToken>(environment.baseUrl + 'users', user);
  }

  private saveToken(token: string): void {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = jwt_decode(token);

    if (!decoded.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (!date) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn(): boolean {
    try {
      const token = this.getAuthToken();

      if (!token || this.isTokenExpired(token)) {
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  logout(): void {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    this.router.navigate(['auth/login']);
  }
}
