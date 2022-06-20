import { Request, Response } from 'express';
import { exists } from 'fs';
import { User } from '../entity/user';
import { userRepository } from '../repository/user.repository';


export async function findUserByNIC(userNic: string) {
    try {
        const result = await (await userRepository()).findOne({ where: { nic: userNic }, relations: ['role'] });
        if (typeof result === 'undefined' || result === null) {
            return null
        } else {
            return result;
        }
    } catch (e) {
        return null;
    }
}


export async function saveUser(req: Request, res: Response) {
    const user: User = req.body;

    try {
        const userExists = await findUserByNIC(user.nic);

        if (!userExists) {
            const newUser = (await userRepository()).create({
                firstName: user.firstName,
                lastName: user.lastName,
                nic: user.nic,
                contactNo: user.contactNo,
                createdDate: new Date(),
                active: user.active,
                role: user.role
            });
            await (await userRepository()).save(newUser);
            res.status(200).json({
                message: 'user submitted succesfully'
            });
        } else {
            res.status(304).json({
                message: 'Not modified, User NIC already exist'
            });
        }


    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
}

export async function getUserByNIC(req: Request, res: Response) {
    const nic = req.params.nic;
    const user = await findUserByNIC(nic);
    try {
        // tslint:disable-next-line: no-console
        console.log('user: ',user);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({
            message: e
        });
    }
}