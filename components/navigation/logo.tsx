import Image from 'next/image';
import SmobeeLogo from "@/public/horisontal.svg";

export default function Logo(){
    return(
        <Image
            priority
            src={SmobeeLogo}
            height={60}
            alt="Follow us on Twitter"
        />
    )
}
