import { District } from "src/modules/districts/entities/district.entity";
import { State } from "src/modules/states/entities/state.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ibgeId: number;
    
    @Column()
    apiId: number;

    @Column()
	name: string;

    @ManyToOne(() => State, state => state.cities, {nullable: false, onDelete: 'CASCADE'})
    state: State;

    @OneToMany(() => District, district => district.city)
    districts: District[];
}
