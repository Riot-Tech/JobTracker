import { Link } from "@prisma/client"
import { postLinkHelper } from "../../helpers"


export const postLinkController = async (link: Link) => {
    const newLink = await postLinkHelper(link);
    if (newLink) return newLink;
    throw Error('New link not found at postLinkController');
}