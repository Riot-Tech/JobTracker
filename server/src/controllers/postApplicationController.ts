import { postApplicationHelper } from "../helpers"
import { Application, jobModality } from "@prisma/client"



export const postApplicationController = async (application: Application) => {
    if(isNaN(application.userId)) { throw new Error('Wrong userId type') };    
    if(typeof application.jobName !== 'string') { throw new Error('Wrong jobName type') };
    //if(typeof application.jobModality !== jobModality) { throw new Error('Wrong modality type') };
    if(typeof application.location !== 'string') { throw new Error('Wrong location type') };
    if(typeof application.expectedIncome !== 'string') { throw new Error('Wrong expectedIncome type') };
    if(typeof application.currency !== 'string') { throw new Error('Wrong currency type') };
    if(typeof application.feedback !== 'string') { throw new Error('Wrong company type') };
    if(typeof application.comments !== 'string') { throw new Error('Wrong company type') };

    const newApplication = await postApplicationHelper(application)
    return newApplication
}