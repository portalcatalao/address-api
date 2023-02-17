import { District } from "src/modules/districts/entities/district.entity";
import { State } from "src/modules/states/entities/state.entity";

export class CreateCityDto {
    id?: number;
    ibgeId: number;
    apiId: number;
	name: string;
    state?: State;
    districts?: District[];
}
