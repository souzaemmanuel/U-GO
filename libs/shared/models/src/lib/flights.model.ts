export interface SearchFlightsFilter {
  from: string;
  to: string;
  budget: string;
}

export interface flight {
  dep_iata: string;
  arr_iata: string;
  cost: string;
  date: string;
  time: string;
  airline_name: string;
}
