import { getLinksHelper } from "../../helpers"


export const getLinksController = async () => {
    const allLinks = await getLinksHelper();
    if (allLinks) return allLinks;
    throw Error('Links not found at getLinksController');
}