import { City } from "src/modules/cities/entities/city.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['shortName'])
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    shortName: string;

    @Column({ nullable: true })
    region: string;

    @OneToMany(() => City, city => city.state)
    cities: City[];
}
