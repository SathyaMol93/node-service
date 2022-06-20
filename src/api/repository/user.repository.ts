import { getRepository } from "typeorm";
import { User } from "../entity/user";

export async function userRepository() {
    const userRepo = getRepository(User);
    return userRepo;
}