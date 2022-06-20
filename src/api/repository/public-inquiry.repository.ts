import { getRepository } from "typeorm";
import { PublicInquiries } from "../entity/public-inquiries";

export async function publicInquiryRepository() {
    const publicInquiryRepo = getRepository(PublicInquiries);
    return publicInquiryRepo;
}