import { postApplicationHelper } from "../helpers"
import { Application } from "@prisma/client"



export const postApplicationController = async (application: Application) => {
    const newApplication = await postApplicationHelper(application)
    return newApplication
}