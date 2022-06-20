import { getRepository } from "typeorm";
import { DsDivision } from "../entity/ds-division";

export async function dsDivisionRepository() {
    const dsDivisionRepo = getRepository(DsDivision);
    return dsDivisionRepo;
}