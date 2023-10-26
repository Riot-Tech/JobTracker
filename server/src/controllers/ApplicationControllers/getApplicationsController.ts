import { getApplicationsHelper } from "../../helpers"



export const getApplicationsController = async (id: number) => {
    if (typeof id !== 'number') throw new Error('Wrong ID type');
    const allApplications = await getApplicationsHelper(id);
    if (allApplications) return allApplications;
    throw Error ('Applications not found at getApplicationController');
}