import { Link } from "@prisma/client"
import { updateLinkHelper } from "../../helpers"


export const updateLinkController = async (link: Link) => {
    const updateLink = await updateLinkHelper(link)
    return updateLink
}