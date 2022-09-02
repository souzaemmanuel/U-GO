import { PartialType } from '@nestjs/mapped-types';
import { IsArray } from 'class-validator';
import { Types } from 'mongoose';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsArray()
  tickets?: Types.ObjectId[];
}
