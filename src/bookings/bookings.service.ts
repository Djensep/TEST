import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EventEntity } from './entity/event.entity';
import { BookingsEntity } from './entity/bookings.entity';

@Injectable()
export class BookingsService {
  constructor(private readonly datasource: DataSource) {}

  async reserve(eventId: number, user_id: number) {
    return this.datasource.transaction(async (manager) => {
      const event = await manager.findOne(EventEntity, {
        where: { id: eventId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!event) throw new NotFoundException('Событие не найдено');

      const existing = await manager.findOne(BookingsEntity, {
        where: { event: { id: eventId }, user_id },
      });
      if (existing) {
        throw new ConflictException(
          'Пользователь уже забронировал это событие',
        );
      }

      const count = await manager.count(BookingsEntity, {
        where: { event: { id: eventId } },
      });
      if (count >= event.total_seats) {
        throw new ConflictException('Места закончились');
      }

      const booking = manager.create(BookingsEntity, {
        event,
        user_id,
      });
      return await manager.save(booking);
    });
  }
}
