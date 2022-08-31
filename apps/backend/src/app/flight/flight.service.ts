import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight, FlightDocument } from './entities/flight.entity';
import { FlightFilter } from './models/flight-search.model';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>
  ) {}

  create(createFlightDto: CreateFlightDto) {
    return new this.flightModel(createFlightDto).save();
  }

  search(filter: FlightFilter) {
    let where = {
      arrivalAirportCode: filter.from,
      departureAirportCode: filter.to,
      cost: { $lt: filter.budget },
      departureDate: {
        $gt: new Date(),
      },
    };
    return this.flightModel.find(where);
  }

  findAll() {
    return this.flightModel.find();
  }

  findOne(id: string) {
    return this.flightModel.findById(id);
  }

  findByEmail(email: string) {
    const obj = this.flightModel.findOne({ email });
    return obj;
  }

  update(id: string, updateFlightDto: UpdateFlightDto) {
    return this.flightModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateFlightDto },
      { new: true }
    );
  }

  remove(id: string) {
    return this.flightModel.deleteOne({ _id: id }).exec();
  }
}
