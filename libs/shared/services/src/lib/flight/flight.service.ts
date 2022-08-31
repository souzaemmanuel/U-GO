import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFlightsFilter, Flight } from '@u-go/models';
import { environment } from '@env/frontend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private httpClient: HttpClient) {}

  getFlightsAvailable(filter: SearchFlightsFilter): Observable<Array<Flight>> {
    return this.httpClient.post<Array<Flight>>(
      environment.baseUrl + 'flight/search',
      filter
    );
  }
}
