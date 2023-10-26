import { getApplicationsHelper } from "../../helpers"



export const getApplicationsController = async () => {
    const allApplications = await getApplicationsHelper();
    if (allApplications) return allApplications;
    throw Error ('Applications not found at getApplicationController');
}