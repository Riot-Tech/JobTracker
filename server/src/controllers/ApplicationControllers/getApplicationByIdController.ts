import { getApplicationByIdHelper } from "../../helpers"



export const getApplicationByIdController = async (id: number) => {
    const application = await getApplicationByIdHelper(id);
    return application;
    
}