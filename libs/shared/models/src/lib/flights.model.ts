export interface SearchFlightsFilter {
  from: string;
  to: string;
  budget: string;
}

export interface Flight {
  airlineName: string;
  id: number;
  arrivalAirportCode: string;
  departureAirportCode: string;
  cost: number;
  departureDate: Date;
  duration: string;
}
