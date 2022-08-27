import { Injectable } from '@angular/core';
import { AuthUser } from '@u-go/models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@env/frontend';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<any>(null);
  user$ = this.userSubject$.asObservable();
  constructor(private httpClient: HttpClient) {}

  login(AuthUser: AuthUser): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/login', AuthUser);
  }
}
