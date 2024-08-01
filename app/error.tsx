"use client"

import { useEffect } from "react"

export default function Error(
    {
    error,
    reset,
    }:{
    error: Error & {digest: string}
    reset: () => void

    }){
    useEffect(() => {
        console.error(error)
    }, [error])

    return(
        <div className="w-full min-h-full flex items-center justifycenter flex-col">
            <h2>{error.message}</h2>
            <button onClick={() => reset()}>TRY AGAIN</button>
        </div>
    )
}