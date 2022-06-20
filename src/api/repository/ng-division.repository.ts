import { getRepository } from "typeorm";
import { GnDivision } from "../entity/ng-division";

export async function gnDivisionRepository() {
    const gnDivisionRepo = getRepository(GnDivision);
    return gnDivisionRepo;
}