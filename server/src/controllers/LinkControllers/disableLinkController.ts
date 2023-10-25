import { disableLinkHelper } from "../../helpers"


export const disableLinkController = async (id: number) => {
    const disableLink = await disableLinkHelper(id)
    return disableLink
}