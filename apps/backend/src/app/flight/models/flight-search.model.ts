import { Flight } from '../entities/flight.entity';

export interface FlightFilter {
  from: string;
  to: string;
  budget: number;
}

export interface BookFlight {
  flightId: string;
}

export interface BookedFlight extends Flight {
  clientName: string;
}
