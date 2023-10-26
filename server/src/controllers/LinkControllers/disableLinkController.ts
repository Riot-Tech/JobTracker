import { disableLinkHelper } from "../../helpers"


export const disableLinkController = async (id: number) => {
    if (typeof id !== 'number') throw new Error('Wrong ID type');
    const disabledLink = await disableLinkHelper(id);
    if (disabledLink) return disabledLink;
    throw Error('Disabled link not found at disableLinkController');
}