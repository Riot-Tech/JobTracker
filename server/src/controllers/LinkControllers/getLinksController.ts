import { getLinksHelper } from "../../helpers"


export const getLinksController = async () => {
    const allLinks = await getLinksHelper()
    return allLinks
}