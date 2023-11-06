import { Application } from "../models/interfaces";

export const validateApplicationForm = (form: Pick<Application,
    "jobName" | "company" | "jobType" | "jobModality" | "location" |
    "date" | "expectedIncome" | "currency" | "status" | "feedback" | "comments">) => {
    const updatedErrors = {
        jobName: '',
        company: '',
        jobType: '',
        jobModality: '',
        location: '',
        date: '',
        expectedIncome: '',
        currency: '',
        status: '',
        feedback: '',
        comments: '',
        links: '',
    };
    if (form.jobName && !/^[a-zA-Z0-9\s]+$/.test(form.jobName)) {
        updatedErrors.jobName = 'Sólo puede contener letras y/o números'
    } else {
        updatedErrors.jobName = ''
    }
    if (form.company && !/^[a-zA-Z0-9\s]+$/.test(form.company)) {
        updatedErrors.company = 'Sólo puede contener letras y/o números'
    } else{
        updatedErrors.company = ''
    }
    if (form.location && !/^[a-zA-Z0-9\s]+$/.test(form.location)) {
        updatedErrors.location = 'Sólo puede contener letras y/o números'
    } else {
        updatedErrors.location = ''
    }
    if (form.currency && !/^[a-zA-Z0-9\s]+$/.test(form.currency)) {
        updatedErrors.currency = 'Sólo puede contener letras y/o números'
    } else {
        updatedErrors.currency = ''
    }
    return updatedErrors;
};