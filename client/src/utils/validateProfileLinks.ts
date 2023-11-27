

export function validateLink(link: string):boolean {

    const regexLink = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/;

    return regexLink.test(link);
}
