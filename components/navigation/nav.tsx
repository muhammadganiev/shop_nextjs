import {auth} from "@/server/auth"
import { UserButton } from "./user-button";
import Logo from "./logo";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default async function Nav(){
    const session = await auth();
    if(session)
        return(
            <header className="bg-slate-500 py-4" >
                <nav>
                    <ul className="flex justify-between">
                        <li>
                            <Logo />
                        </li>
                        {!session?(
                            <li>
                                <Button>
                                    <Link href="/auth/login">
                                    <LogIn/>
                                    <span>Login</span>
                                    </Link>
                                </Button>
                            </li>
                        ) : 
                        <li>
                            <UserButton expires={session?.expires} user={session?.user } />
                        </li> }
                    </ul>
                </nav>
            </header>
        )
}