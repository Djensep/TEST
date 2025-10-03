import { IsInt, IsPositive } from 'class-validator';

export class ReserveBookingDto {
  @IsInt()
  @IsPositive()
  event_id: number;

  @IsInt()
  @IsPositive()
  user_id: number;
}
