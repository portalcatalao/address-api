import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { State } from './modules/states/entities/state.entity';
import { StatesModule } from './modules/states/states.module';
import { CitiesModule } from './modules/cities/cities.module';
import { DistrictsModule } from './modules/districts/districts.module';
import { City } from './modules/cities/entities/city.entity';
import { District } from './modules/districts/entities/district.entity';
import { IbgeModule } from './services/ibge/ibge.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '189.90.130.154',
      port: 3306,
      username: 'portalcatalao_db',
      password: '1/4CTKJ{)#~VsL1',
      database: 'portalcatalao_address',
      entities: [State, City, District],
      synchronize: true
    }),
    StatesModule,
    CitiesModule,
    DistrictsModule,
    IbgeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
