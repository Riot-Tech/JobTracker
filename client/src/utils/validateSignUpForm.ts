import { input } from "../models/interfaces";
import { z } from 'zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;

export const validateSignUpForm = (input: input) =>{
    const { email, password, name } = input as {email: string, password: string, name: string}

    const schema = z.object({
        name: z.string().min(3, "At least three letters").max(50, '50 characters max').optional().or(z.string().refine((val) => val !== '', {
          message: 'Mandatory field'
        })),
        email: z.string().email("Invalid email").min(1, "Email required").optional().or(z.string().refine((val) => val !== '', {
          message: 'Mandatory field'
        })),
        password: z.string().min(3, "At least three characters").optional().or(z.string().refine((val) => val !== '', {
          message: 'Mandatory field'
        }))
      });
      
      try {
        schema.parse({
          name,
          email,
          password,
        });
        return {}; // No hay errores
      } catch (error: unknown) {
        if (typeof error === "object") {
          const errors = {} as Record<string, string>;
    
          const zodError = error as z.ZodError;
          zodError.issues.forEach((issue) => {
            if (issue.path) {
              errors[issue.path.join(".")] = issue.message;
            }
          });
    
          return errors;
        }
    
        return {} 
      }
}