import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DsDivision } from "./ds-division";
import { GnDivision } from "./ng-division";
import { User } from "./user";

@Entity({ name: "personal_inquiries" })
export class PersonalInquiries extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'personel_inquiries_id' })
    personelInquiriesId!: number;

    @ManyToOne(type => User, user => user.userid)
    @JoinColumn({ name:'user_id' })
    user!: User;

    @ManyToOne(type => DsDivision, dsDivision => dsDivision.dsDivisionId)
    @JoinColumn({ name:'ds_division_id' })
    dsDivision!: DsDivision;

    @ManyToOne(type => GnDivision, gnDivision => gnDivision.gnDivisionId)
    @JoinColumn({ name:'gn_division_id' })
    gnDivision!: GnDivision;

    @Column({ name: 'inquiry' })
    inquiry!: string;

    @Column({ name: 'created_date' })
    createdDate!: Date;

    @Column({ name: 'inquiry_type' })
    inquiryType!: string;

    @Column({ name: 'name' })
    name!: string;

    @Column({ name: 'address' })
    address!: string;

    @Column({ name: 'contact_no' })
    contactNo!: string;

    @Column({ name: 'email' })
    email!: string;
}