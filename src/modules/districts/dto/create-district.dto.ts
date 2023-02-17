import { City } from "src/modules/cities/entities/city.entity";

export class CreateDistrictDto {
    id?: number;
    apiId: number;
    name: string;
    city: City;
}
