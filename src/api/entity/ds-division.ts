import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Distric } from "./distric";

@Entity({ name: "ds_division" })
export class DsDivision extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'ds_division_id' })
    dsDivisionId!: number;

    @ManyToOne(type => Distric, distric => distric.districId)
    @JoinColumn({ name:'distric_id' })
    distric!: Distric;

    @Column({ name: 'division_code' })
    divisionCode!: string;

    @Column({ name: 'division_name' })
    divisionName!: string;
}