import { PrismaClient } from "@prisma/client";
import { Application } from "../types";

const prisma = new PrismaClient();

export const postApplicationHelper = async (application: Application) => {
    const res = await prisma.application.create({
        data: {
            id: application.id,
            jobName: application.jobName,
            company: application.company,
            jobType: application.jobType,
            jobModality: application.jobModality,
            location: application.location,
            expectedIncome: application.expectedIncome,
            currency: application.currency,
            feedback: application.feedback,
            comments: application.comments,
        }
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error creating the application')
}