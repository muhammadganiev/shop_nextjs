import * as z from "zod"

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string().min(8,{
        message:"Password must be at least 8 charachters long",
    }),
    name: z.string().min(3, {message:"please add the name with at least 3 charachters"})
})