import { downloadFile } from "../../utils/cloudUtils";

export const downloadFileController = async (filename: string, userId: number) => {
    if (typeof(userId) !== 'number') {
      throw new Error('Wrong userId type');
    };
    if (!filename || typeof(filename) !== 'string') {
      throw new Error('Wrong filename type');
    };

    const response = await downloadFile(filename, userId);
    if(response) return response;
}