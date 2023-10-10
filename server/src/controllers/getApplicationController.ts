import { getApplicationHelper } from "../helpers"
import { Application } from "@prisma/client"



export const getApplicationController = async () => {
    const allApplications = await getApplicationHelper()
    return allApplications
}