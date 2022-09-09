import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { CreateFlightDto } from '../dto/create-flight.dto';
import { UpdateFlightDto } from '../dto/update-flight.dto';
import { Flight, FlightDocument } from '../entities/flight.entity';
import { FlightFilter, BookedFlight } from '../models/flight-search.model';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
    private readonly userService: UsersService
  ) {}

  create(createFlightDto: CreateFlightDto) {
    const flight = new this.flightModel({
      ...createFlightDto,
      _id: new Types.ObjectId(),
    });

    return flight.save();
  }

  search(filter: FlightFilter) {
    let where = {
      arrivalAirportCode: filter.from,
      departureAirportCode: filter.to,
      cost: { $lt: filter.budget },
      isAvailable: true,
      departureDate: {
        $gt: new Date(),
      },
    };

    return this.flightModel.find(where).exec();
  }

  leaveFlightUnavailable(id: string) {
    return this.flightModel
      .updateOne(
        {
          _id: new Types.ObjectId(id),
        },
        { isAvailable: false },
        { upsert: true }
      )
      .exec();
  }

  async book(flightId: string, user: User): Promise<BookedFlight> {
    //get flight
    const flight = await this.flightModel
      .findOne({
        _id: new Types.ObjectId(flightId),
        isAvailable: true,
      })
      .exec();

    if (!flight) {
      throw new HttpException(
        'Flight was not found or this is not available anymore!',
        HttpStatus.NOT_FOUND
      );
    }

    //leaving flight as unavailable
    this.leaveFlightUnavailable(flightId);

    //geting user details
    let dbUser = await this.userService.findByEmail(user.email);

    dbUser.tickets.push(new Types.ObjectId(flightId));

    //linking user x tickets
    this.userService.updateTickets(dbUser._id.toString(), dbUser);

    return {
      ...flight.toJSON(),
      clientName: dbUser.name,
    } as BookedFlight;
  }
}
