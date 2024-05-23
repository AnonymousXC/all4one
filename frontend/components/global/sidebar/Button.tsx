import Image from "next/image";
import { ReactNode } from "react";

type Props = {
    image: string,
    children?: ReactNode,
    active: boolean,
    redirector: any
}

function Button({ image, children, active, redirector } : Props) {
    return (
        <button className={`${active == true ? 'bg-white ml-3 rounded-r-none' : ''} flex max-w-full w-full bg-darker-blue py-5 px-5 gap-4 rounded-3xl items-center !transition-all`}
        onClick={redirector}>
            <Image src={image} width={20} height={20} alt="icon" />
            {children}
        </button>
    )
}

export default Button;