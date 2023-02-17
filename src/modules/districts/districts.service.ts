import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entities/district.entity';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District) private districtRepository: Repository<District>
  ) {}

  async create(createDistrictDto: CreateDistrictDto) {
    const {city, name} = createDistrictDto;
    try {
      if(!city) throw new Error('É necessário uma cidade para cadastar um bairro.');
      
      const districtAlreadyExists = await this.districtRepository.findOne({where: {
        name: Like(name),
        city: {
          id: city.id
        }
      }});
      if(districtAlreadyExists) throw new Error('Bairro já foi cadastrada.');
      
      const district = this.districtRepository.create(createDistrictDto);

      return {
        success: true,
        district: await this.districtRepository.save(district)
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findAll() {
    return await this.districtRepository.find({
      relations: ['city']
    });
  }

  async findByCity(cityId: number) {
    try {
      const districts = await this.districtRepository.find({
        where: {
          city: {
            id: cityId
          }
        },
        order: {
          name: 'ASC'
        }
      });

      return {
        success: true,
        results: districts
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} district`;
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return `This action updates a #${id} district`;
  }

  async remove(id: number) {
    try {
      const districtAlreadyExists = await this.districtRepository.findOne({where: {id}});
      if(!districtAlreadyExists) throw new Error('Bairro não encontrado.');

      await this.districtRepository.delete(id);

      return {
        success: true,
        message: 'Bairro removido com sucesso.'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
