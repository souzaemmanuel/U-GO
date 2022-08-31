import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  airlineName: string;

  @IsString()
  arrivalAirportCode: string;

  @IsString()
  departureAirportCode: string;

  @IsNumber()
  cost: number;

  @IsDate()
  @Type(() => Date)
  departureDate: Date;
}

const teste: CreateFlightDto = {
  airlineName: 'GOL',
  arrivalAirportCode: 'CWB',
  departureAirportCode: 'LAX',
  cost: 329.8,
  departureDate: new Date(),
};
