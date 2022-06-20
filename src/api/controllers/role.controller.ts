import { json, Request, Response } from 'express';
import { Role } from '../entity/role';
import { roleRepository } from '../repository/role.repository';
import { userRepository } from '../repository/user.repository';


export async function findRoleByRoleId(roleId: number) {
    try {
        const result = await (await roleRepository()).findOne({ where: { role_id: roleId } });
        if (typeof result === 'undefined' || result === null) {
            return null
        } else {
            return result;
        }
    } catch (e) {
        return null;
    }
}

export async function saveRole(req: Request, res: Response) {
    const role: Role = req.body;
    const newRole = (await roleRepository()).create({
        createdDate: new Date(),
        status: 2,
        roleDescription: role.roleDescription,
        roleName: role.roleName
    });
    // tslint:disable-next-line: no-console
    console.log('role : ', newRole);
    try {
        await (await roleRepository()).save(newRole);
        res.status(200).json({
            message: 'role submitted succesfully'
        })
    } catch (e) {
        res.status(500).json({
            message: JSON.stringify(e)
        })
    }
}