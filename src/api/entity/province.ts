import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "provice" })
export class Province extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'province_id' })
    provinceId!: number;

    @Column({ name: 'country_id' })
    countryId!: number;

    @Column({ name: 'province_code' })
    provinceCode!: string;

    @Column({ name: 'province_name' })
    provinceName!: string;
}