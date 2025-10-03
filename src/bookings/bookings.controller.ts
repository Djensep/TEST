import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { ReserveBookingDto } from './reserveBooking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('reserve')
  @HttpCode(HttpStatus.CREATED)
  async reserve(@Body() dto: ReserveBookingDto) {
    return await this.bookingsService.reserve(dto.event_id, dto.user_id);
  }
}
