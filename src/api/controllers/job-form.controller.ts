import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { JobSearchDao } from '../dao/job-search-dao';
import { JobInquiries } from '../entity/job-inquiries';
import { jobInquiryRepository } from '../repository/job-inquiry.repository';
import { checkPermision } from './auth.controller';

export async function createJobForm(req: Request, res: Response) {
    const form: JobInquiries = req.body;
    const newForm = (await jobInquiryRepository()).create({
        user: form.user,
        dsDivision: form.dsDivision,
        gnDivision: form.gnDivision,
        inquiry: form.inquiry,
        createdDate: new Date(),
        inquiryType: form.inquiryType,
        name: form.name,
        address: form.address,
        contactNo: form.contactNo,
        email: form.email,
        highestEducation: form.highestEducation,
        job: form.job,
        jobExperience: form.jobExperience,
        homeTown: form.homeTown
    });
    try {
        await (await jobInquiryRepository()).save(newForm);
        res.status(200).json({
            message: 'Form submitted succesfully'
        })
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
}

export async function getJobFormByUserID(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
        const result = await (await jobInquiryRepository())
            .find({
                where: {
                    user: userId
                },
                order: {
                    createdDate: "ASC"
                },
                relations: [
                    "user",
                    "dsDivision",
                    "gnDivision"
                ]
            });
        if (typeof result === 'undefined' || result === null) {
            res.status(200).json([]);
        } else {
            res.status(200).json(result);
        }
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
}

export async function searchJobFomrs(req: Request, res: Response) {
    const searchdao: JobSearchDao = req.body;

    const key = 'authorization';
    const bearerToken = req.headers[key];
    const accesstoken = bearerToken?.split(' ')[1];

    if (checkPermision(typeof accesstoken === 'undefined' ? '' : accesstoken, 'admin role')) {
        try {
            const queryBuild = (await jobInquiryRepository())
                .createQueryBuilder('job_inquiries')
                .where('job_inquiries.name IS NOT NULL');

            if (searchdao.dsDivisionId) {
                queryBuild.andWhere('job_inquiries.ds_division_id = :dsId', { dsId: searchdao.dsDivisionId });
            }

            if (searchdao.gnDivisionId) {
                queryBuild.andWhere('job_inquiries.gn_division_id = :gnId', { gnId: searchdao.gnDivisionId });
            }

            if (searchdao.contactNo) {
                queryBuild.andWhere('job_inquiries.contact_no LIKE :contact', { contact: searchdao.contactNo });
            }

            if (searchdao.name) {
                queryBuild.andWhere('job_inquiries.name LIKE :name', { name: searchdao.name });
            }

            if (searchdao.email) {
                queryBuild.andWhere('job_inquiries.email LIKE :email', { email: searchdao.email });
            }

            if (searchdao.inquiryType) {
                queryBuild.andWhere('job_inquiries.inquiry_type LIKE :inquirytype', { inquirytype: searchdao.inquiryType });
            }

            const result = await queryBuild.getMany();

            if (typeof result === 'undefined' || result === null) {
                res.status(200).json([]);
            } else {
                for (const obj of result) {
                    const ds = await getConnection()
                        .createQueryBuilder()
                        .relation(JobInquiries, "dsDivision")
                        .of(obj)
                        .loadOne();

                    obj.dsDivision = ds;

                    const gn = await getConnection()
                        .createQueryBuilder()
                        .relation(JobInquiries, "gnDivision")
                        .of(obj)
                        .loadOne();

                    obj.gnDivision = gn;

                    const user = await getConnection()
                        .createQueryBuilder()
                        .relation(JobInquiries, "user")
                        .of(obj)
                        .loadOne();

                    obj.user = user;
                }

                res.status(200).json(await Promise.all(result));
            }
        } catch (e) {
            res.status(500).json({
                message: e
            });
        }
    } else {
        res.sendStatus(403);
    }

}