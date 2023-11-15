// import { PrismaClient, Link } from "@prisma/client";
// const prisma = new PrismaClient();

// export const updateLinkHelper = async (links: Link[]) => {
//     let res = null; // Declarar res una vez afuera del bucle
    
//     for (const link of links) {
//         if (link.appId) {
//             res = await prisma.link.update({
//                 where: { id: link.appId },
//                 data: { name: link.name, url: link.url },
//             });
//         } else if (link.userId) {
//             res = await prisma.link.update({
//                 where: { id: link.userId },
//                 data: { name: link.name, url: link.url },
//             });
//         } else if (link.spontId) {
//             res = await prisma.link.update({
//                 where: { id: link.id },
//                 data:  { name: link.name, url: link.url },
//             });
//             console.log(res)
//         }
//     }
   
//     await prisma.$disconnect();
    
//     if (res) {
//         return res;
//     }

//     throw new Error('Error updating link');
// };