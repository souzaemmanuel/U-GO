import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { type } from 'os';
import { Flight } from '../../flight/entities/flight.entity';

export type UserDocument = User & Document;

@Schema({ _id: false })
export class User {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Type(() => Flight)
  @Prop([{ required: false, type: [Types.ObjectId], ref: Flight.name }])
  tickets!: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
