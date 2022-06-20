import { getRepository } from "typeorm";
import { PersonalInquiries } from "../entity/personal-inquiries";

export async function personalInquiryRepository() {
    const personalInquiryRepo = getRepository(PersonalInquiries);
    return personalInquiryRepo;
}