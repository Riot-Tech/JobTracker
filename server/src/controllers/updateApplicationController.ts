import { updateApplicationHelper } from "../helpers"
import { Application, jobModality, jobType } from "@prisma/client"



export const updateApplicationController = async (application: Application) => {
    console.log(application)
    if (typeof application.userId !== 'number') {
        throw new Error('Wrong userId type')
    };
    if (typeof application.jobName !== 'string') {
        throw new Error('Wrong jobName type')
    };
    if (typeof application.company !== 'string') {
        throw new Error('Wrong company type')
    };
    if (!Object.values(jobType).includes(application.jobType)) {
        throw new Error('Wrong job type value')
    };
    if (!Object.values(jobModality).includes(application.jobModality)) {
        throw new Error('Wrong modality value')
    };
    if (typeof application.location !== 'string') {
        throw new Error('Wrong location type')
    };
    if (typeof application.expectedIncome !== 'number') {
        throw new Error('Wrong expectedIncome type')
    };
    if (typeof application.currency !== 'string') {
        throw new Error('Wrong currency type')
    };
    if (typeof application.feedback !== 'string') {
        throw new Error('Wrong feedback type')
    };
    if (typeof application.comments !== 'string') {
        throw new Error('Wrong company type')
    };
    const updateApplication = await updateApplicationHelper(application)
    return updateApplication
} // para controlar las validaciones de los update tengo que verificar que el tipo de dato
// ingresado sea correcto pero yo no sé qué me va a entrar. 