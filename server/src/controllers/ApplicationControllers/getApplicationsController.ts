import { getApplicationsHelper } from "../../helpers"



export const getApplicationsController = async () => {
    const allApplications = await getApplicationsHelper()
    return allApplications
}