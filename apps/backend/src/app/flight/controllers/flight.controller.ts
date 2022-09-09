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

  @Get()
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.update(id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightService.remove(id);
  }
}
