import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>
  ) { }

  async create(createCityDto: CreateCityDto) {
    const { state, apiId } = createCityDto;
    try {
      if (!state) throw new Error('É necessário um estado para cadastar uma cidade.');

      const cityAlreadyExists = await this.cityRepository.findOne({
        where: {
          apiId,
          state: {
            id: state.id
          }
        }
      });
      if (cityAlreadyExists) throw new Error('Cidade já foi cadastrada.');

      const city = this.cityRepository.create(createCityDto);
      return {
        success: true,
        city: await this.cityRepository.save(city)
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findAll() {
    return await this.cityRepository.find({ relations: ['state'] });
  }

  async findDistrictsByCity(id: number) {
    try {
      const city = await this.cityRepository.findOne({
        where: { id },
        relations: ['districts']
      });

      if (!city) throw new Error('Cidade não encontrado.')

      return {
        success: true,
        cities: city.districts
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findCitiesByState(id: number) {
    try {
      const cities = await this.cityRepository.find({
        where: { 
          state: {
            id
          } 
        },
        order: {
          name: 'ASC'
        }
      });

      return {
        success: true,
        results: cities
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }

  async autocomplete(field: string) {
    try {
      const query = this.cityRepository.createQueryBuilder('city')
        .leftJoinAndSelect('city.state', 'state')
        .where('city.name LIKE :field', { field: `%${field}%` })
        .orderBy('city.name', 'ASC')
        .limit(15);

      const [results, total] = await query.getManyAndCount();

      return {
        success: true,
        results,
        total
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
