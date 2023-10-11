import { getApplicationsHelper } from "../helpers"
import { Application } from "@prisma/client"



export const getApplicationsController = async () => {
    const allApplications = await getApplicationsHelper()
    return allApplications
}