import { postSpontaneousHelper } from "../../helpers"
import { Spontaneous } from "@prisma/client"


export const postSpontaneousController = async (spontaneous: Spontaneous) => {
    if (typeof spontaneous.userId !== 'number')  throw new Error('Wrong userId type') ;
    if (typeof spontaneous.message !== 'string')  throw new Error('Wrong message type') ;
    if (typeof spontaneous.receiver !== 'string')  throw new Error('Wrong receiver type') ;
    if (typeof spontaneous.company !== 'string')  throw new Error('Wrong company type') ;
    const newSpontaneous = await postSpontaneousHelper(spontaneous);
    if (newSpontaneous) return newSpontaneous;
    throw Error('Spontaneous application not found at postSpontaneousController');
};