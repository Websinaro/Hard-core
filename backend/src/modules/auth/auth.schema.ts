import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().trim().min(2,"Name Must Contains Atleast 2 Character").max(100,"Name Is Too Long"),
    
    email: z.string().trim().email("Invalid Email Format").transform((value) => value.toLowerCase()),
    
    phoneNumber: z.string().trim().min(7,"Invalid PhoneNumber").max(20,"Invalid PhoneNumber").optional(),
    
    password: z.string().min(8,"Password Must contain 8 character").max(128,"Password  is too long"),
    
});

export type RegisterInput = z.infer<typeof registerSchema>;
