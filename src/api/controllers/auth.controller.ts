import { NextFunction, Request, Response } from 'express';
import { AuthPayloadDao } from "../dao/auth-payload-dao";
import jwt from "jsonwebtoken";
import { userRepository } from '../repository/user.repository';
import fs from 'fs';
import { Role } from '../entity/role';


export async function login(req: Request, res: Response): Promise<Response> {
    const userNic = req.body.nic;
    try {
        const userExist = await (await userRepository()).findOne({ where: { nic: userNic }, relations: ['role'] });
        if (typeof userExist !== "undefined") {
            const userRole = userExist.role;
            if (userRole != null) {
                const authDao: AuthPayloadDao = {
                    user: userExist,
                    role: userRole,
                    permission: []
                }
                const bearerToken = jwt.sign(authDao, 'sap-clientsecret', { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 60) });
                res.status(200).json({ token: bearerToken, tokentype: 'Bearer', nic: userExist.nic, firstName: userExist.firstName, lastName: userExist.lastName, expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 60) });
            } else {
                res.status(403).json({
                    message: 'role not found'
                });
            }
        } else {
            res.status(403).json({
                message: 'user not found'
            });
        }

    } catch (e) {
        res.status(500).json({
            message: e
        })
    }

    return res;

}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const key = 'authorization';
    const bearerToken = req.headers[key];
    const accesstoken = bearerToken?.split(' ')[1];
    if (typeof accesstoken !== 'undefined' && accesstoken !== '') {
        jwt.verify(accesstoken, 'sap-clientsecret', (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                next();
            }
        })
    } else {
        res.sendStatus(403)
    }
}

export async function checkToken(req: Request, res: Response) {
    const key = 'authorization';
    const bearerToken = req.headers[key];
    const accesstoken = bearerToken?.split(' ')[1];
    if (typeof accesstoken !== 'undefined' && accesstoken !== '') {
        jwt.verify(accesstoken, 'sap-clientsecret', (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                res.sendStatus(200)
            }
        })
    } else {
        res.sendStatus(403)
    }
}

export async function checkPermision(token: string, roleName: string): Promise<boolean> {
    let hasAuthority = false;
    if (typeof token !== 'undefined' && token !== '') {
        jwt.verify(token, 'sap-clientsecret', (err, authData)=> {
            if (err) {
                hasAuthority = false;
            } else {
                const payload: any = jwt.decode(token);
                const role : Role = payload.role;
                if (role.roleName === roleName || role.roleName === 'super admin') {
                hasAuthority = true;
                }
            }
        });

    } else {
        hasAuthority = false;
    }

    return hasAuthority;
}


