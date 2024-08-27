import { CheckCircle2 } from "lucide-react";



export const FormSuccess = ({message} : {message?:string}) =>{
    if(!message) return null
    return(
        <div className="bg-green-400/25 flex items-center text-xs font-medium my-4 gap-2 text-secondary-foreground p-3 rounded-md">
            <CheckCircle2 className="w-4 h-4"/>
            <p>{message}</p>
        </div>
    )
}