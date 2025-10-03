import { Module } from '@nestjs/common';
import { BookingsModule } from './bookings/bookings.module';
import { DatasourceModule } from './datasource/datasource.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BookingsModule,
    DatasourceModule.forRootAsync(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
