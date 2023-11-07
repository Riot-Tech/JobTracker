import { z } from "zod";
import { inputSpontaneous } from "../models/interfaces";

const locations = [ 'USA', 'LATAM', 'EUROPE', 'ASIA' ]

export const validateCreateSpontaneous = (input: inputSpontaneous) => {
  const { company, date, message, feedback, links, location, receiver } = input 
  const schema = z.object({
    company: z
      .string()
      .min(1,"Company name required"),
    message: z.string().min(1,'Message Required').max(500),
    /* date: z
      .string()
      .refine((date)=> new Date(date).toString() !== 'Invalid Date',{message: 'Date required'}), */
    feedback: z.string().min(1,'At least one character'),
    links: z.string().min(1,'At least one character'),
    location: z.string().min(1,'At least one character'),
    receiver: z.string().min(1,'At least one character')
  });

  try {
    schema.parse({
      company,
      message,/* 
      date, */
      feedback,
      links,
      location,
      receiver
    });
    return {
        company:'',/* 
        date:'', */
        message:'',
        feedback:'',
        links:'',
        location:'',
        receiver:''
    }; // No hay errores
  } catch (error: unknown) {
    if (typeof error === "object") {
      const errors: inputSpontaneous = {
        company:'',
        message:'',/* 
        date:'', */
        feedback:'',
        links:'',
        location:'',
        receiver:''
      };

      const zodError = error as z.ZodError;
      zodError.issues.forEach((issue) => {
        if (issue.path) {
          errors[issue.path.join('.')] = issue.message;
        }
      });

      return errors;
    }

    return {
        company:'',
        message:'',/* 
        date:'', */
        feedback:'',
        links:'',
        location:'',
        receiver:''
    };
  }
}

