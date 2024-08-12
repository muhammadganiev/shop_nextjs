"use client"

import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import Image from "next/image"

export const UserButton = ({user }:Session) => {
    return(
        <div>
            <h1>{user?.email} </h1>
            <button onClick={() => signOut() }>Sign Out</button>
        </div>
    )
}