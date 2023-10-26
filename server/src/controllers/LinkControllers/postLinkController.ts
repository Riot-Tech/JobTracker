import { Link } from "@prisma/client"
import { postLinkHelper } from "../../helpers"


export const postLinkController = async (link: Link) => {
    const newLink = await postLinkHelper(link)
    return newLink
}