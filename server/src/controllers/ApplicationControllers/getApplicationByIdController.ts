import { getApplicationByIdHelper } from "../../helpers"



export const getApplicationByIdController = async (id: number) => {
    if (typeof id !== 'number') throw new Error('Wrong ID type');
    const application = await getApplicationByIdHelper(id);
    if (application) return application;
    throw Error ('Application not found at getApplicationController');
}