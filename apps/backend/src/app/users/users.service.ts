import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findByEmail(createUserDto.email)) {
      throw new HttpException(
        'User already exists',
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

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  updateTickets(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        email: updateUserDto.email,
      },
      { tickets: updateUserDto.tickets },
      { upsert: true, useFindAndModify: false }
    );
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true }
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
