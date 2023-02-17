import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { IbgeModule } from 'src/services/ibge/ibge.module';
import { CitiesModule } from '../cities/cities.module';
import { DistrictsModule } from '../districts/districts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([State]),
    IbgeModule,
    CitiesModule,
    DistrictsModule
  ],
  controllers: [StatesController],
  providers: [StatesService]
})
export class StatesModule {}
