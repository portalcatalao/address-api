import { City } from "src/modules/cities/entities/city.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class District {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    apiId: number;

    @Column()
    name: string;

    @ManyToOne(() => City, city => city.districts, {nullable: false, onDelete: 'CASCADE'})
    city: City;
}
