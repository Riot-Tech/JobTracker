import { disableSpontaneousHelper } from "../helpers"



export const disableSpontaneousController = async (id: number) => {
    const disableSpontaneous = await disableSpontaneousHelper(id)
    return disableSpontaneous
}