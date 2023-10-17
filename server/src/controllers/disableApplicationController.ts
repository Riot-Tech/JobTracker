import { disableApplicationHelper } from "../helpers"


export const disableApplicationController = async (id: number) => {
    const disableApplication = await disableApplicationHelper(id)
    return disableApplication
}