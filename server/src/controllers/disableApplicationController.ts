import { disableApplicationHelper } from "../helpers"


export const disableApplicationController = async (id: number) => {
    if(typeof id !== 'number'){
        throw new Error('Wrong ID type')
    }
    const disableApplication = await disableApplicationHelper(id)
    return disableApplication
}