import { Link } from "@prisma/client"
import { updateLinkHelper } from "../../helpers"


export const updateLinkController = async (link: Link) => {
    const updatedLink = await updateLinkHelper(link);
    if (updatedLink) return updatedLink;
    throw Error('Updated link not found at updateLinkController');
}