import { input } from "../models/interfaces";
import { z } from 'zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;

export const validateLoginForm = (input: input) =>{
    const { email, password } = input as {email: string, password: string}

    const schema = z.object({
        email: z.string().email("El mail no es un correo válido").min(1, "El mail es requerido"),
        password: z.string()
          .min(3, "La contraseña debe tener al menos 3 caracteres")
      });
      try {
        schema.parse({
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