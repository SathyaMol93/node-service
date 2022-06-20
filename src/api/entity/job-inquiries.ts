import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DsDivision } from "./ds-division";
import { GnDivision } from "./ng-division";
import { User } from "./user";

@Entity({ name: "job_inquiries" })
export class JobInquiries extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'job_inquiries_id' })
    jobInquiriesId!: number;

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

    @Column({ name: 'highest_education' })
    highestEducation!: string;

    @Column({ name: 'job' })
    job!: string;

    @Column({ name: 'job_experience' })
    jobExperience!: string;

    @Column({ name: 'home_town' })
    homeTown!: string;
}