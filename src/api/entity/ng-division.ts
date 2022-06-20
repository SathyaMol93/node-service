import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DsDivision } from "./ds-division";

@Entity({ name: "gn_division" })
export class GnDivision extends BaseEntity {

    @PrimaryGeneratedColumn( { name: 'gn_division_id' })
    gnDivisionId!: number;

    @Column({ name: 'division_code' })
    divisionCode!: string;

    @Column({ name: 'gn_division_name', default: null })
    gnDivisionName!: string;

    @Column({ name: 'division_no', default: null })
    divisionNo!: string;

    @Column({ name: 'gn_division_code', default: null })
    gnDivisionCode!: number;
}