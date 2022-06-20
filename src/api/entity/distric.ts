import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Province } from "./province";

@Entity({ name: "distric" })
export class Distric extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'distric_id' })
    districId!: number;

    @Column({ name: 'distric_code' })
    districCode!: string;

    @Column({ name: 'distric_name' })
    districName!: string;

    @ManyToOne(type => Province, province => province.provinceId)
    @JoinColumn({ name:'province_id' })
    province!: Province;
}