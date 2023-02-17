import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { ParseIntPipe } from '@nestjs/common/pipes';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.statesService.create(createStateDto);
  }

  @Get()
  findAll() {
    return this.statesService.findAll();
  }

  @Get(':id/cities')
  findCities(@Param('id') id: string) {
    return this.statesService.findCitiesByState(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.statesService.update(+id, updateStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statesService.remove(+id);
  }

  @Post('synchronize')
  synchronize() {
    return this.statesService.synchronize();
  }
  
  @Post('synchronize/cities')
  synchronizeCities() {
    return this.statesService.synchronizeCities();
  }
  
  @Post(':id/synchronize/districts')
  synchronizeDistrictsByState(@Param('id', ParseIntPipe) id: number) {
    return this.statesService.synchronizeDistrictsByState(id);
  }
}
