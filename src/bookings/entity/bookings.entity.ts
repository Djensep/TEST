import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('bookings')
export class BookingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => EventEntity, (e) => e.user_id, { onDelete: 'CASCADE' })
  event: EventEntity;
}
