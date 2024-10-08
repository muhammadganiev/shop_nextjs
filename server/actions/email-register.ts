'use server'

import { RegisterSchema } from '@/types/register-schema'
import {createSafeActionClient} from 'next-safe-action'
import bcrypt from 'bcrypt'
import { db } from '..'
import { eq } from 'drizzle-orm'
import { users } from '../schema'
import { error } from 'console'
import { generateEmailVerificationToken } from './tokens'
import { sendVerificationEmail } from './resend-email'



const action = createSafeActionClient()

export const emailRegister = action(RegisterSchema, async({email, name, password}) =>{
    //hashing passwords
    const hashedPassword = await bcrypt.hash(password, 10)
    //check existing user
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    })

    if(existingUser){
        if(!existingUser.emailVerified){
            const verificationToken = await generateEmailVerificationToken(email)
            await sendVerificationEmail(
                verificationToken[0].email,
                verificationToken[0].token
            )

            return {success: "Email Confirmation resent"}
        }

        return{error:"Email already in use"}
    }
    //new users registration
    await db.insert(users).values({
        email,
        name,
        password: hashedPassword,
    })
    const verificationToken = await generateEmailVerificationToken(email)
    await sendVerificationEmail(
        verificationToken[0].email,
        verificationToken[0].token 
    )
    return {success: "Confirmation Email Sent!"}
})