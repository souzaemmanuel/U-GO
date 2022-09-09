export interface SearchFlightsFilter {
  from: string;
  to: string;
  budget: string;
}

export interface Flight {
  airlineName: string;
  _id: string;
  arrivalAirportCode: string;
  departureAirportCode: string;
  cost: number;
  departureDate: Date;
  duration: string;
}

export interface BookedFlight extends Flight {
  clientName: string;
}

export interface Airport {
  city: string;
  fullName: string;
  country: { name: string };
  iata: string;
  name: string;
  state: { name: string; abbr: string };
}

export interface AirportSearchResponse {
  airports: Array<Airport>;
}
