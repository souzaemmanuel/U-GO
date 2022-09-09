import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserDocument, User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { FlightDocument, Flight } from '../entities/flight.entity';
import { FlightService } from './flight.service';
jest.useFakeTimers();
describe('FlightService', () => {
  let service: FlightService;
  let mockFlightModel: Model<FlightDocument>;
  let mockUserModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    mockUserModel = module.get<Model<UserDocument>>(getModelToken(User.name));

    mockFlightModel = module.get<Model<FlightDocument>>(
      getModelToken(Flight.name)
    );
    service = module.get<FlightService>(FlightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
