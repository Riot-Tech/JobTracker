import { disableSpontaneousHelper } from "../helpers"



export const disableSpontaneousController = async (id: number) => {
    if(typeof id !== 'number'){
        throw new Error('Wrong ID type')
    }
    const disableSpontaneous = await disableSpontaneousHelper(id)
    return disableSpontaneous
}