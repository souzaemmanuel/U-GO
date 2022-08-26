import { Injectable } from '@angular/core';
import { Authenticate } from '@u-go/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<User>(null);
  user$ = this.userSubject$.asObservable();
  constructor(private httpClient: HttpClient) {}

  login(authenticate: Authenticate): Observable<any> {
    return this.httpClient
      .post('http://localhost:3333/api/login', authenticate)
      .pipe(tap((user: User) => this.userSubject$.next(user)));
  }
}
