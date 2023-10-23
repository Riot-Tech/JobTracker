import { updateSpontaneousHelper } from "../helpers"
import { Spontaneous } from "@prisma/client"


export const updateSpontaneousController = async (spontaneous: Spontaneous) => {
    const updateSpontaneous = await updateSpontaneousHelper(spontaneous)
    return updateSpontaneous
}