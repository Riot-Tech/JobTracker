import { viewFile } from "../../utils/cloudUtils";

export const viewFileController = async (filename: string, userId: number) => {
    if (typeof(userId) !== 'number') {
      throw new Error('Wrong userId type');
    };
    if (!filename || typeof(filename) !== 'string') {
      throw new Error('Wrong filename type');
    };

    const signedUrl = await viewFile(filename, userId);
    if(signedUrl) return signedUrl;
    throw Error("No signed URL received at controller");
}