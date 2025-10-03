import { IsInt, IsPositive, MinLength } from 'class-validator';

export class ReserveBookingDto {
  @IsInt()
  @IsPositive()
  event_id: number;

  @IsInt()
  @MinLength(1)
  user_id: number;
}
