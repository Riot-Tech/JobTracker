import { disableApplicationHelper } from "../helpers"
import { Application } from "@prisma/client"



export const disableApplicationController = async (id: number, application: Application) => {
    const disableApplication = await disableApplicationHelper(id, application)
    return disableApplication
}