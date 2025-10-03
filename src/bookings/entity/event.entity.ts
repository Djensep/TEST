import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookingsEntity } from './bookings.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  total_seats: number;

  @OneToMany(() => BookingsEntity, (b) => b.event)
  user_id: BookingsEntity;
}
