import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { Airlines } from '../models/airlines.enum';
import { Airports } from '../models/airports.enum';

export class CreateFlightDto {
  @IsString()
  airlineName: Airlines;

  @IsString()
  arrivalAirportCode: Airports;

  @IsString()
  departureAirportCode: Airports;

  @IsNumber()
  cost: number;

  @IsDate()
  @Type(() => Date)
  departureDate: Date;

  @IsBoolean()
  isAvailable: boolean;

  @IsString()
  duration: string;
}

const example: CreateFlightDto = {
  airlineName: Airlines.GOL,
  arrivalAirportCode: Airports.AUS,
  departureAirportCode: Airports.LAX,
  cost: 329.8,
  departureDate: new Date(),
  duration: '22h 50m 30s',
  isAvailable: true,
};
