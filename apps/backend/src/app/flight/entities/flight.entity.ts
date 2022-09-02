import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Airlines } from '../models/airlines.enum';
import { Airports } from '../models/airports.enum';

export type FlightDocument = Flight & Document;

@Schema({ _id: false })
export class Flight {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  airlineName: Airlines;

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
