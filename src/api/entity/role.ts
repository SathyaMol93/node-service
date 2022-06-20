import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";


@Entity({ name: "role" })
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'role_id' })
    roleId!: number;

    @Column({ name: 'created_date' })
    createdDate!: Date;

    @Column({ name: 'status' })
    status!: number;

    @Column({ name: 'role_description' })
    roleDescription!: string;

    @Column({ name: 'role_name' })
    roleName!: string;

}