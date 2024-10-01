'use server'

import { LoginSchema } from '@/types/login-schema'
import {createSafeActionClient} from 'next-safe-action'
import { db } from '..';
import { users } from '../schema';
import { eq } from 'drizzle-orm';
import { generateEmailVerificationToken } from './tokens';
import { sendVerificationEmail } from './resend-email';
import { AuthError } from 'next-auth';
import { signIn } from '../auth';


const action = createSafeActionClient();

export const emailSignIn = action(LoginSchema, 
    async ({password, email, code}) => {
    try {
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
        })
        if(existingUser?.email !== email){
            return {error: "Email not found"}
        }
    
        if(!existingUser.emailVerified){
            const verificationToken = await generateEmailVerificationToken(
                existingUser.email
            ) 
            await sendVerificationEmail(
                verificationToken[0].email, 
                verificationToken[0].token
            )
            return {success: "Email sent"} 
        }
        
        await signIn('credentials',
        {
            email,
            password,
            redirectTo: '/',
        }
        )
        return {success: email}
        
        } catch (error) {
                console.log(error);
                if(error instanceof AuthError){
                    switch(error.type){
                        case 'CredentialsSignin':
                            return {error: "Email or Password is incorrect"}
                        case 'AccessDenied':
                            return {error: error.message}
                        case 'OAuthSignInError':
                            return {error: error.message}
                        default:
                            return {error: "An error occurred"}
                    }
                }
                throw error
        } 
})