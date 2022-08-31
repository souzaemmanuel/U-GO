import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlightDocument = Flight & Document;

@Schema()
export class Flight {
  @Prop({ required: true, type: String })
  airlineName: string;

  @Prop({ type: Number })
  id: number;

  @Prop({ required: true, type: String })
  arrivalAirportCode: string;

  @Prop({ required: true, type: String })
  departureAirportCode: string;

  @Prop({ required: true, type: Number })
  cost: number;

  @Prop({ required: true, type: Date })
  departureDate: Date;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
