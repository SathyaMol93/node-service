import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { PublicSearchdao } from '../dao/public-search-dao';
import { PublicInquiries } from '../entity/public-inquiries';
import { publicInquiryRepository } from '../repository/public-inquiry.repository';
import { checkPermision } from './auth.controller';

export async function createPublicForm(req: Request, res: Response) {
    const form: PublicInquiries = req.body;
    const newForm = (await publicInquiryRepository()).create({
        user: form.user,
        dsDivision: form.dsDivision,
        gnDivision: form.gnDivision,
        inquiry: form.inquiry,
        createdDate: new Date(),
        inquiryType: form.inquiryType
    });
    try {
        await (await publicInquiryRepository()).save(newForm);
        res.status(200).json({
            message: 'Form submitted succesfully'
        })
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
}

export async function getPublicFormByUserID(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
        const result = await (await publicInquiryRepository())
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



export async function searchPublicFomrs(req: Request, res: Response) {
    const searchdao: PublicSearchdao = req.body;

    const key = 'authorization';
    const bearerToken = req.headers[key];
    const accesstoken = bearerToken?.split(' ')[1];

    if (checkPermision(typeof accesstoken === 'undefined' ? '' : accesstoken, 'admin role')) {
        try {
            const queryBuild = (await publicInquiryRepository())
                .createQueryBuilder('public_inquiries')
                .where('public_inquiries.inquiry IS NOT NULL');

            if (searchdao.dsDivisionId) {
                queryBuild.andWhere('public_inquiries.ds_division_id = :dsId', { dsId: searchdao.dsDivisionId });
            }

            if (searchdao.gnDivisionId) {
                queryBuild.andWhere('public_inquiries.gn_division_id = :gnId', { gnId: searchdao.gnDivisionId });
            }

            if (searchdao.inquiryType) {
                queryBuild.andWhere('public_inquiries.inquiry_type LIKE :inquirytype', { inquirytype: searchdao.inquiryType });
            }

            const result = await queryBuild.getMany();

            if (typeof result === 'undefined' || result === null) {
                res.status(200).json([]);
            } else {
                for (const obj of result) {
                    const ds = await getConnection()
                        .createQueryBuilder()
                        .relation(PublicInquiries, "dsDivision")
                        .of(obj)
                        .loadOne();

                    obj.dsDivision = ds;

                    const gn = await getConnection()
                        .createQueryBuilder()
                        .relation(PublicInquiries, "gnDivision")
                        .of(obj)
                        .loadOne();

                    obj.gnDivision = gn;

                    const user = await getConnection()
                        .createQueryBuilder()
                        .relation(PublicInquiries, "user")
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