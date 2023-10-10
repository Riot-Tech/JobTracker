import { postApplicationHelper } from "../helpers"



export const postApplicationController = async (application: any) => {
    const newApplication = await postApplicationHelper(application)
    return newApplication
}