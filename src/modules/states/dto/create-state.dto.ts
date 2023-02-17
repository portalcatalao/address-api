import { City } from "src/modules/cities/entities/city.entity";

export class CreateStateDto {
    id?: number;
    name: string;
    shortName: string;
    region?: string;
    cities?: City[];
}
