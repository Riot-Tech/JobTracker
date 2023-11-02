import { postApplicationHelper, postLinksHelper } from "../../helpers";
import { Application, Link, jobModality, jobType } from "@prisma/client";



export const postApplicationController = async (application: Application, links: Link[]) => {
    // VALIDAR LA APPLICATION
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

    let newLinks = null;

    // SI HAY LINKS, VALIDARLOS
    if (links && links.length) {
        links.forEach(link => {
            if (link.appId) {
                if (typeof link.appId !== 'number') throw new Error('Wrong appId type');
                if (link.spontId) throw new Error("Link cannot have two different id's (appId & spontId)");
                if (link.userId) throw new Error ("Link cannot have two different id's (appId & userId)");
            } else throw new Error('No valid appId found');
            if (typeof link.name !== 'string') throw new Error('Wrong name type');
            if (typeof link.url !== 'string') throw new Error('Wrong url type');
        });
        newLinks = await postLinksHelper(links);
    }
    const newApplication = await postApplicationHelper(application);

    if (newApplication) {
        if (newLinks) {
            return {
                application: newApplication,
                links: newLinks
            }
        } else return newApplication;
    }

    throw Error ('Application not found at postApplicationController');
}