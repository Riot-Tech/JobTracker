import { postLinksHelper, updateLinkHelper, updateSpontaneousHelper } from "../../helpers"
import { Link, Spontaneous } from "@prisma/client"


export const updateSpontaneousController = async (spontaneous: Spontaneous, links: Link[]) => {
    if (typeof spontaneous.id !== 'number') throw new Error('Wrong id type');
    if (typeof spontaneous.userId !== 'number') throw new Error('Wrong userId type');
    if (spontaneous.message !== undefined && typeof spontaneous.message !== 'string') throw new Error('Wrong message type');
    if (spontaneous.receiver !== undefined && typeof spontaneous.receiver !== 'string') throw new Error('Wrong receiver type');
    if (spontaneous.company !== undefined && typeof spontaneous.company !== 'string') throw new Error('Wrong company type');
    
    const updatedSpontaneous = await updateSpontaneousHelper(spontaneous);

    const { id } = spontaneous;

    const spontaneousLinks = links?.map((link) => {
        return {
            ...link,
            spontId: id,
        }
    });

    let newLinks = null;
    // SI HAY LINKS, VALIDARLOS
    if (spontaneousLinks?.length) {
        spontaneousLinks.forEach(link => {
            if (link.spontId) {
                if (typeof link.spontId !== 'number') throw new Error('Wrong spontId type');
            } else throw new Error('Non valid spontId found');
            if (typeof link.name !== 'string') throw new Error('Wrong name type');
            if (typeof link.url !== 'string') throw new Error('Wrong url type');
        });
        newLinks = await updateLinkHelper(spontaneousLinks);
    }

    if (updatedSpontaneous) {
        if (newLinks) {
            return {
                spontaneous: updatedSpontaneous,
                links: newLinks
            }
        } else return updatedSpontaneous;
    }

    throw Error('Spontaneous application not found at updateSpontaneousController');
}