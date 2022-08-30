import { Injectable } from '@angular/core';
import { AuthUser, UserToken } from '@u-go/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '@env/frontend';
import jwt_decode from 'jwt-decode';

const AUTH_TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<any>(null);
  user$ = this.userSubject$.asObservable();
  constructor(private httpClient: HttpClient) {}

  login(AuthUser: AuthUser): Observable<UserToken> {
    return this.httpClient
      .post<UserToken>(environment.baseUrl + 'login', AuthUser)
      .pipe(
        tap((response: UserToken) => {
          this.saveToken(response.accessToken);

          this.userSubject$.next({
            token: response.accessToken,
          });
        })
      );
  }

  createAccount(AuthUser: AuthUser): Observable<UserToken> {
    return this.httpClient.post<UserToken>(
      environment.baseUrl + 'users',
      AuthUser
    );
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

  isUserLoggedIn() {
    const token = this.getAuthToken();

    if (!token || this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
