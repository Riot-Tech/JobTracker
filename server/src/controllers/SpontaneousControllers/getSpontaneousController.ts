import { getSpontaneousHelper } from "../../helpers"


export const getSpontaneousController = async () => {
    const allApplications = await getSpontaneousHelper()
    return allApplications
}