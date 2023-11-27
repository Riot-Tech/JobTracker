import { Links, UserInfo } from "../models/interfaces";
import { z } from 'zod'


export const validateLink = (input: UserInfo) => {
    const { linkedIn, gitHub, portfolio } = input

    // const regexLink = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/;

    // return regexLink.test(link);

    const schema = z.object({
        linkedIn: z.string().max(100).refine((value) => {
            // Asegurarse de que el enlace comienza con 'http'
            return value.startsWith('http') || value === '';
        }, {
            message: 'Invalid Link',
        }),
        gitHub: z.string().max(100).refine((value) => {
            // Asegurarse de que el enlace comienza con 'http'
            return value.startsWith('http') || value === '';
        }, {
            message: 'Invalid Link',
        }),
        portfolio: z.string().max(100).refine((value) => {
            // Asegurarse de que el enlace comienza con 'http'
            return value.startsWith('http') || value === '';
        }, {
            message: 'Invalid Link',
        }),
    });
    try {
        schema.parse({
            linkedIn,
            gitHub,
            portfolio
        });
        return { linkedIn: "", gitHub: "", portfolio: "" }; // No hay errores
    } catch (error: unknown) {
        if (typeof error === "object") {
            const errors: Links = { linkedIn: "", gitHub: "", portfolio: "" }

            const zodError = error as z.ZodError;
            zodError.issues.forEach((issue) => {
                if (issue.path) {
                    errors[issue.path.join(".")] = issue.message;
                }
            });

            return errors;
        }

        return { linkedIn: "", gitHub: "", portfolio: "" }
    }
}