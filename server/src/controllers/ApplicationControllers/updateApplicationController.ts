import { updateApplicationHelper } from "../../helpers"
import { Application, jobModality, jobType } from "@prisma/client"



export const updateApplicationController = async (application: Application) => {

    if (typeof application.id !== 'number') throw new Error('Wrong id type');
    if (typeof application.userId !== 'number') throw new Error('Wrong userId type');
    if(application.jobName !== undefined && typeof application.jobName !== 'string') throw new Error('Wrong jobName type');
    if (application.company !== undefined && typeof application.company !== 'string') throw new Error('Wrong company type');
    if (application.jobType !== undefined && !Object.values(jobType).includes(application.jobType)) throw new Error('Wrong job type value');
    if (application.jobModality !== undefined && !Object.values(jobModality).includes(application.jobModality)) throw new Error('Wrong modality value');
    if (application.location !== undefined && typeof application.location !== 'string') throw new Error('Wrong location type');
    if (application.expectedIncome !== undefined && typeof application.expectedIncome !== 'number') throw new Error('Wrong expectedIncome type');
    if (application.currency !== undefined && typeof application.currency !== 'string') throw new Error('Wrong currency type');
    if (application.feedback !== undefined && typeof application.feedback !== 'string') throw new Error('Wrong feedback type');
    if (application.comments !== undefined && typeof application.comments !== 'string') throw new Error('Wrong comments type');
    const updateApplication = await updateApplicationHelper(application);
    return updateApplication;
} 