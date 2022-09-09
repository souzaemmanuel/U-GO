import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.findByEmail(createUserDto.email)) {
      throw new HttpException(
        'This email is already registered! Try again with a different email.',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const user = new this.userModel({
      ...createUserDto,
      _id: new Types.ObjectId(),
      password: await bcrypt.hash(createUserDto.password, 10),
    });

    return user.save();
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  updateTickets(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(id),
          email: updateUserDto.email,
        },
        { tickets: updateUserDto.tickets },
        { upsert: true, useFindAndModify: false }
      )
      .exec();
  }
}
