import { getRepository } from "typeorm";
import { Role } from "../entity/role";

export async function roleRepository() {
    const roleRepo = getRepository(Role);
    return roleRepo;
}