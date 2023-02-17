import {Controller, Get} from '@nestjs/common';
import { IbgeService } from './ibge.service';

@Controller('ibge')
export class IbgeController {
    constructor(private readonly ibgeService: IbgeService) {}

    @Get('states')
    searchStates() {
        return this.ibgeService.searchStates();
    }
}