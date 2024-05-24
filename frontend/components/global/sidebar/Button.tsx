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
        <button className={`${active == true ? '!bg-[#222222] text-white md:ml-3 md:rounded-r-none' : ''} flex max-w-full w-full bg-[#FAFBFF] py-5 px-5 gap-4 rounded-3xl items-center !transition-all`}
        onClick={redirector}>
            <Image src={image} width={20} height={20} alt="icon" className={active ? "invert" : "invert-0"} />
            {children}
        </button>
    )
}

export default Button;