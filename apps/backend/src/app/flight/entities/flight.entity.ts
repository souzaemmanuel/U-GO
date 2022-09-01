import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Airlines } from '../models/airlines.enum';
import { Airports } from '../models/airports.enum';

export type FlightDocument = Flight & Document;

@Schema()
export class Flight {
  @Prop({ required: true, type: String })
  airlineName: Airlines;

  @Prop({ type: Number })
  id: number;

  @Prop({ required: true, type: String })
  arrivalAirportCode: Airports;

  @Prop({ required: true, type: String })
  departureAirportCode: Airports;

  @Prop({ required: true, type: Number })
  cost: number;

  @Prop({ required: true, type: Date })
  departureDate: Date;

  @Prop({ type: Boolean })
  isAvailable: boolean;

  @Prop({ required: true, type: String })
  duration: string;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
