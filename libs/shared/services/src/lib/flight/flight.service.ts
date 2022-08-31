import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFlightsFilter } from '@u-go/models';
import { environment } from '@env/frontend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private httpClient: HttpClient) {}

  getFlightsAvailable(filter: SearchFlightsFilter): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseUrl + 'flight/search',
      filter
    );
  }
}
