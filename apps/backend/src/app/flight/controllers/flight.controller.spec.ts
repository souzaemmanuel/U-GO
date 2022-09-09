import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from '../services/flight.service';
import { FlightController } from './flight.controller';
import { UsersModule } from '../../users/users.module';
import { AuthModule } from '../../auth/auth.module';
import { UsersService } from '../../users/services/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlightDocument, Flight } from '../entities/flight.entity';
import { UserDocument, User } from '../../users/entities/user.entity';
jest.useFakeTimers();

describe('FlightController', () => {
  let controller: FlightController;
  let mockFlightModel: Model<FlightDocument>;
  let mockUserModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightController],
      providers: [
        FlightService,
        UsersService,
        {
          provide: getModelToken(Flight.name),
          useValue: Model,
        },
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    mockFlightModel = module.get<Model<FlightDocument>>(
      getModelToken(Flight.name)
    );

    mockUserModel = module.get<Model<UserDocument>>(getModelToken(User.name));

    controller = module.get<FlightController>(FlightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
