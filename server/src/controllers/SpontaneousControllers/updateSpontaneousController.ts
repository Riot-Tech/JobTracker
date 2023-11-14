import { updateSpontaneousHelper } from "../../helpers"
import { Spontaneous } from "@prisma/client"


export const updateSpontaneousController = async (spontaneous: Spontaneous) => {
    if (typeof spontaneous.id !== 'number') throw new Error('Wrong id type');
    if (typeof spontaneous.userId !== 'number') throw new Error('Wrong userId type');
    if (spontaneous.message !== undefined && typeof spontaneous.message !== 'string') throw new Error('Wrong message type');
    if (spontaneous.receiver !== undefined && typeof spontaneous.receiver !== 'string') throw new Error('Wrong receiver type');
    if (spontaneous.company !== undefined && typeof spontaneous.company !== 'string') throw new Error('Wrong company type');
    
    const updatedSpontaneous = await updateSpontaneousHelper(spontaneous);

    if(updatedSpontaneous) return updatedSpontaneous;
    
    throw Error('Spontaneous application not found at updateSpontaneousController');
}