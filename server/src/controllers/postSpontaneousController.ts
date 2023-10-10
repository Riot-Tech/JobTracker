import { postSpontaneousHelper } from "../helpers"
import { Spontaneous } from "@prisma/client"


export const postSpontaneousController = async (spontaneus: Spontaneous) => {
    const newSponteaneus = await postSpontaneousHelper(spontaneus)
    return newSponteaneus
}