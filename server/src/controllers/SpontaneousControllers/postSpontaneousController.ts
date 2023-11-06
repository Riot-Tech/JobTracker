import { postSpontaneousHelper, postLinksHelper } from "../../helpers"
import { Link, Spontaneous } from "@prisma/client";


export const postSpontaneousController = async (spontaneous: Spontaneous, links: Link[]) => {
    // VALIDAR LA SPONTANEOUS
    if (typeof spontaneous.userId !== 'number')  throw new Error('Wrong userId type');
    if (typeof spontaneous.message !== 'string')  throw new Error('Wrong message type');
    if (typeof spontaneous.receiver !== 'string')  throw new Error('Wrong receiver type');
    if (typeof spontaneous.company !== 'string')  throw new Error('Wrong company type');
    
    const newSpontaneous = await postSpontaneousHelper(spontaneous);

    const { id } = newSpontaneous;
    
    const spontaneousLinks = links.map((link) => {
        return {
            ...link,
            spontId: id
        }
    });

    let newLinks = null;
    // SI HAY LINKS, VALIDARLOS
    if (spontaneousLinks.length) {
        spontaneousLinks.forEach(link => {
            if (link.spontId) {
                if (typeof link.spontId !== 'number') throw new Error('Wrong spontId type');
                if (link.appId) throw new Error("Link cannot have two different id's (spontId & appId)");
                if (link.userId) throw new Error("Link cannot have two different id's (spontId & userId)");
            } else throw new Error('No valid spontId found');
            if (typeof link.name !== 'string') throw new Error('Wrong name type');
            if (typeof link.url !== 'string') throw new Error('Wrong url type');
        });
        newLinks = await postLinksHelper(spontaneousLinks);
    }

    
    if (newSpontaneous) {
        if (newLinks) {
            return {
                spontaneous: newSpontaneous,
                links: newLinks
            }
        } else return newSpontaneous;
    }

    throw Error('Spontaneous application not found at postSpontaneousController');
};