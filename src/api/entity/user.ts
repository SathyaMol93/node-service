import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role";

@Entity({ name: "user" })
export class User extends BaseEntity {

	@PrimaryGeneratedColumn({ name: 'user_id' })
	userid!: number;

	@Column({ name: 'first_name' })
	firstName!: string;

	@Column({ name: 'last_name' })
	lastName!: string;

	@Column({ name: 'nic' })
	nic!: string;

	@Column({ name: 'contact_no' })
	contactNo!: string;

	@Column({ name: 'created_date' })
	createdDate!: Date;

	@Column({ name: 'active' })
	active!: boolean;

	@ManyToOne(type => Role)
	@JoinColumn({name:'role_id'})
	role!: Role;
}