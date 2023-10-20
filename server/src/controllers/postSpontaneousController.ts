import { postSpontaneousHelper } from "../helpers"
import { Spontaneous } from "@prisma/client"


export const postSpontaneousController = async (spontaneus: Spontaneous) => {
    if(isNaN(spontaneus.id)) { throw new Error('Wrong ID type') };
    if(isNaN(spontaneus.userId)) { throw new Error('Wrong userId type') };    
    if(typeof spontaneus.message !== 'string') { throw new Error('Wrong message type') };
    if(typeof spontaneus.receiver !== 'string') { throw new Error('Wrong receiver type') };
    if(typeof spontaneus.company !== 'string') { throw new Error('Wrong company type') };
    const newSponteaneus = await postSpontaneousHelper(spontaneus)
    return newSponteaneus
};