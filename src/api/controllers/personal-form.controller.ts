import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { PersonalSearchDao } from '../dao/personal-search-dao';
import { PersonalInquiries } from '../entity/personal-inquiries';
import { personalInquiryRepository } from '../repository/personal-inquiries.repository';
import { checkPermision } from './auth.controller';

export async function createPersonalForm(req: Request, res: Response) {
    const form: PersonalInquiries = req.body;
    const newForm = (await personalInquiryRepository()).create({
        user: form.user,
        dsDivision: form.dsDivision,
        gnDivision: form.gnDivision,
        inquiry: form.inquiry,
        createdDate: new Date(),
        inquiryType: form.inquiryType,
        name: form.name,
        address: form.address,
        contactNo: form.contactNo,
        email: form.email
    });
    try {
        await (await personalInquiryRepository()).save(newForm);
        res.status(200).json({
            message: 'Form submitted succesfully'
        })
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
}


export async function getPersonalFormByUserID(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
        const result = await (await personalInquiryRepository())
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


export async function searchPersonalFomrs(req: Request, res: Response) {
    const searchdao: PersonalSearchDao = req.body;

    const key = 'authorization';
    const bearerToken = req.headers[key];
    const accesstoken = bearerToken?.split(' ')[1];

    if (checkPermision(typeof accesstoken === 'undefined' ? '' : accesstoken, 'admin role')) {
        try {
            const queryBuild = (await personalInquiryRepository())
                .createQueryBuilder('personal_inquiries')
                .where('personal_inquiries.name IS NOT NULL');

            if (searchdao.dsDivisionId) {
                queryBuild.andWhere('personal_inquiries.ds_division_id = :dsId', { dsId: searchdao.dsDivisionId });
            }

            if (searchdao.gnDivisionId) {
                queryBuild.andWhere('personal_inquiries.gn_division_id = :gnId', { gnId: searchdao.gnDivisionId });
            }

            if (searchdao.contactNo) {
                queryBuild.andWhere('personal_inquiries.contact_no LIKE :contact', { contact: searchdao.contactNo });
            }

            if (searchdao.name) {
                queryBuild.andWhere('personal_inquiries.name LIKE :name', { name: searchdao.name });
            }

            if (searchdao.email) {
                queryBuild.andWhere('personal_inquiries.email LIKE :email', { email: searchdao.email });
            }

            if (searchdao.inquiryType) {
                queryBuild.andWhere('personal_inquiries.inquiry_type LIKE :inquirytype', { inquirytype: searchdao.inquiryType });
            }

            const result = await queryBuild.getMany();

            if (typeof result === 'undefined' || result === null) {
                res.status(200).json([]);
            } else {
                for (const obj of result) {
                    const ds = await getConnection()
                        .createQueryBuilder()
                        .relation(PersonalInquiries, "dsDivision")
                        .of(obj)
                        .loadOne();

                    obj.dsDivision = ds;

                    const gn = await getConnection()
                        .createQueryBuilder()
                        .relation(PersonalInquiries, "gnDivision")
                        .of(obj)
                        .loadOne();

                    obj.gnDivision = gn;

                    const user = await getConnection()
                        .createQueryBuilder()
                        .relation(PersonalInquiries, "user")
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