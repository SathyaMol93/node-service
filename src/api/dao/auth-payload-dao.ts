import { Role } from "../entity/role";
import { User } from "../entity/user";


export interface AuthPayloadDao{
    user: User,
    role: Role;
    permission: string[];
}