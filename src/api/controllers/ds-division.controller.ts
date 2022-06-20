import { Request, Response } from 'express';
import { dsDivisionRepository } from '../repository/ds-division.repository';

export async function getDsDivision(req: Request, res: Response): Promise<Response> {
    const key = 'authorization';
    const bearerToken = req.headers[key];
    const accesstoken = bearerToken?.split(' ')[1];
    const token = typeof accesstoken === 'undefined' ? "" : accesstoken;
    // tslint:disable-next-line: no-console
    console.log('token', accesstoken);
    try {
        const result = await (await dsDivisionRepository())
            .find({
                order: { divisionName: "ASC" }
            });
        if (typeof result === 'undefined' || result === null) {
            res.status(404).json({
                message: 'No DS devision found'
            });
        } else {
            res.status(200).json(result);
        }
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }

    return res;

}

export async function getDsDivisionByDistricId(req: Request, res: Response): Promise<Response> {
    const districId = req.params.districId;
    try {
        const result = await (await dsDivisionRepository())
            .find({
                where: { distric: districId },
                relations: ['distric'],
                order: { divisionName: "ASC" }
            });
        if (typeof result === 'undefined' || result === null) {
            res.status(404).json({
                message: 'No DS devision found'
            });
        } else {
            res.status(200).json(result);
        }
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }

    return res;
}