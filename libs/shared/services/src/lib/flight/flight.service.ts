import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFlightsFilter, Flight } from '@u-go/models';
import { environment } from '@env/frontend';
import { Observable } from 'rxjs';
import { BookedFlight } from '../../../../models/src';

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

  bookFlight(flightId: string): Observable<BookedFlight> {
    return this.httpClient.post<BookedFlight>(
      environment.baseUrl + 'flight/book',
      flightId
    );
  }
}
