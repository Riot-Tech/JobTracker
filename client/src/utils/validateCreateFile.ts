import { inputFile, fileErrors } from "../models/interfaces";


export function validateFile (file: File | null, errors: fileErrors) {
    errors.file = '';

    if (!file) {
        errors.file = 'Please select a file to upload';
    } else if (!(file instanceof File)) {
        errors.file = 'File type is not valid';
    };

    return errors;
}

export function validateFileInput (input: inputFile, errors: fileErrors) {
    errors = {
        ...errors,
        name: '',
    }
    if (!input.name) {
        errors.name = 'Required field';
    } else if (input.name.length > 35) {
        errors.name = 'File name is too long';
    };

    return errors;
}