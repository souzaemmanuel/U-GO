import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { User } from '../../users/entities/user.entity';
import { CreateFlightDto } from '../dto/create-flight.dto';
import { UpdateFlightDto } from '../dto/update-flight.dto';
import {
  FlightFilter,
  BookFlight,
  BookedFlight,
} from '../models/flight-search.model';
import { FlightService } from '../services/flight.service';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @IsPublic()
  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('search')
  search(@Body() flightFilter: FlightFilter) {
    return this.flightService.search(flightFilter);
  }

  @HttpCode(HttpStatus.OK)
  @Post('book')
  book(
    @Body() flight: BookFlight,
    @CurrentUser() user: User
  ): Promise<BookedFlight> {
    return this.flightService.book(flight.flightId, user);
  }
}
