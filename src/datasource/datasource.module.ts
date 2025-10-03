import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsEntity } from 'src/bookings/entity/bookings.entity';
import { EventEntity } from 'src/bookings/entity/event.entity';

@Module({})
export class DatasourceModule {
  static forRootAsync(): DynamicModule {
    return {
      module: DatasourceModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            url: config.get('DATABASE_URL'),
            type: 'postgres',
            schema: 'public',
            entities: [BookingsEntity, EventEntity],
            synchronize: true,
          }),
        }),
      ],
    };
  }
}
