export type linkCondition = {
    userId: number | null;
    appId: number | null;
    spontId: number | null;
    name: string | null;
    url: string | null;
}

export type UploadedFile = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    buffer: Buffer,
    size: number
}