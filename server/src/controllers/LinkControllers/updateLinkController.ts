import { Link } from "@prisma/client"
import { updateLinkHelper } from "../../helpers"


export const updateLinkController = async (link: Link) => {
    if (typeof link.userId !== 'number') throw new Error('Wrong userId type');
    if (typeof link.appId !== 'number') throw new Error('Wrong appId type');
    if (typeof link.spontId !== 'number') throw new Error('Wrong sponId type');
    if (typeof link.name !== 'string') throw new Error('Wrong name type');
    if (typeof link.url !== 'string') throw new Error('Wrong url type');
    const updatedLink = await updateLinkHelper(link);
    if (updatedLink) return updatedLink;
    throw Error('Updated link not found at updateLinkController');
}