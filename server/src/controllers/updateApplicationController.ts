import { updateApplicationHelper } from "../helpers"
import { Application } from "@prisma/client"



export const updateApplicationController = async (application: Application) => {
    const updateApplication = await updateApplicationHelper(application)
    return updateApplication
}