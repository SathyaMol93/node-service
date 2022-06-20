import { getRepository } from "typeorm";
import { Distric } from "../entity/distric";


export async function districRepository() {
    const districRepo = getRepository(Distric);
    return districRepo;
}