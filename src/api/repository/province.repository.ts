import { getRepository } from "typeorm";
import { Province } from "../entity/province";

export async function provinceRepository() {
    const provinceRepo = getRepository(Province);
    return provinceRepo;
}