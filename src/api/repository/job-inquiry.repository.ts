import { getRepository } from "typeorm";
import { JobInquiries } from "../entity/job-inquiries";

export async function jobInquiryRepository() {
    const jobInquiryRepo = getRepository(JobInquiries);
    return jobInquiryRepo;
}