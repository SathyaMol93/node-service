import { Request, Response } from 'express';
import { gnDivisionRepository } from '../repository/ng-division.repository';

export async function getGnDivision(req: Request, res: Response): Promise<Response> {
    try {
        const result = await (await gnDivisionRepository())
            .find({
                order: {
                    gnDivisionName: "ASC"
                }
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

export async function getGnDivisionByDivisionCode(req: Request, res: Response): Promise<Response> {
    const dsDivisionCode = req.params.dsDivisionCode;
    try {
        const result = await (await gnDivisionRepository())
            .find(
                {
                    where: {
                        divisionCode: dsDivisionCode
                    },
                    order: {
                        gnDivisionName: "ASC"
                    }
                });
        if (typeof result === 'undefined' || result === null) {
            res.status(404).json({
                message: 'No GN devision found'
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