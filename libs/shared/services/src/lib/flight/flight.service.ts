import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  SearchFlightsFilter,
  Flight,
  BookedFlight,
  AiportSearchResponse,
} from '@u-go/models';
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

  bookFlight(flightId: string): Observable<BookedFlight> {
    return this.httpClient.post<BookedFlight>(
      environment.baseUrl + 'flight/book',
      { flightId }
    );
  }

  searchAirports(airportName: string): Observable<AiportSearchResponse> {
    return this.httpClient.get<AiportSearchResponse>(
      `${environment.airportEndpoint}?term=${airportName}`,
      {
        headers: {
          'APC-Auth': '683c2a1e8b',
        },
      }
    );
  }
}
