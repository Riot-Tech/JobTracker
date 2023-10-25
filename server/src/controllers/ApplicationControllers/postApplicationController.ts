import { postApplicationHelper } from "../../helpers";
import { Application, jobModality, jobType } from "@prisma/client";



export const postApplicationController = async (application: Application) => {
    if (typeof application.userId !== 'number') throw new Error('Wrong userId type');
    if (typeof application.jobName !== 'string') throw new Error('Wrong jobName type');
    if (typeof application.company !== 'string') throw new Error('Wrong company type');
    if (!Object.values(jobType).includes(application.jobType)) throw new Error('Wrong job type value');
    if (!Object.values(jobModality).includes(application.jobModality)) throw new Error('Wrong modality value');
    if (typeof application.location !== 'string') throw new Error('Wrong location type');
    if (typeof application.expectedIncome !== 'number') throw new Error('Wrong expectedIncome type');
    if (typeof application.currency !== 'string') throw new Error('Wrong currency type');
    if (typeof application.feedback !== 'string') throw new Error('Wrong feedback type');
    if (typeof application.comments !== 'string') throw new Error('Wrong company type');

    const newApplication = await postApplicationHelper(application);
    return newApplication;
}