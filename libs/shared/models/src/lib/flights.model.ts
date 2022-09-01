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
