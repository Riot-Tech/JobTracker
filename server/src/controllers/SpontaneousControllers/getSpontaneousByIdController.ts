import { getSpontaneousByIdHelper } from "../../helpers"


export const getSpontaneousByIdController = async (id: number) => {
    const spontaneous = await getSpontaneousByIdHelper(id);
    return spontaneous;
}