import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IbgeService } from 'src/services/ibge/ibge.service';
import { Repository } from 'typeorm';
import { CitiesService } from '../cities/cities.service';
import { DistrictsService } from '../districts/districts.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State) private stateRepository: Repository<State>,
    private readonly ibgeService: IbgeService,
    private readonly cityService: CitiesService,
    private readonly districtService: DistrictsService
  ) { }

  async create(createStateDto: CreateStateDto) {
    try {
      const state = this.stateRepository.create(createStateDto);
      return {
        success: true,
        state: await this.stateRepository.save(state)
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findAll() {
    return await this.stateRepository.find();
  }

  async findOne(id: number) {
    return await this.stateRepository.findOne({ where: { id } });
  }

  async findCitiesByState(id: number) {
    try {
      const state = await this.stateRepository.findOne({
        where: { id },
        relations: ['cities']
      });

      if(!state) throw new Error('Estado não encontrado.')

      return {
        success: true,
        cities: state.cities  
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  update(id: number, updateStateDto: UpdateStateDto) {
    return `This action updates a #${id} state`;
  }

  remove(id: number) {
    return `This action removes a #${id} state`;
  }

  async synchronize() {
    try {
      const statesByIbge = await this.ibgeService.searchStates();

      for (let i = 0; i < statesByIbge.length - 1; i++) {
        await this.create({
          name: statesByIbge[i].name,
          shortName: statesByIbge[i].shortName,
          region: statesByIbge[i].region
        });
      }

      return {
        success: true,
        states: await this.stateRepository.find()
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async synchronizeCities() {
    try {
      const states = await this.stateRepository.find();

      for (let i = 0; i < states.length - 1; i++) {
        const cities = await this.ibgeService.searchCitiesByState(states[i].shortName);

        for (let j = 0; j < cities.length - 1; j++) {
          const res = await this.cityService.create({
            apiId: cities[j].id,
            ibgeId: cities[j].ibgeId,
            name: cities[j].name,
            state: states[i]
          });
        }
      }

      return {
        success: true,
        states: await this.stateRepository.find()
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async synchronizeDistrictsByState(id: number) {
    try {
      const cities = await this.findCitiesByState(id).then(res => res.cities);

      if(!cities) throw new Error('Não foi possível encontrar cidades para este estado.')

      for (let i = 0; i < cities.length - 1; i++) {
        const districts = await this.ibgeService.searchDistrictsByCity(cities[i].apiId);

        for (let j = 0; j < districts.length - 1; j++) {
          const res = await this.districtService.create({
            apiId: districts[j].id,
            city: cities[i],
            name: districts[j].name,
          });
        }
      }

      return {
        success: true,
        districts: await this.districtService.findAll(),
        cities: cities
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
