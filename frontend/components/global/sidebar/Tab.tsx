import Image from "next/image";
import { ReactNode } from "react";
import Link from "next/link";

type Props = {
    image: string,
    children?: ReactNode,
    pathname: string,
    href: string
}

function Tab({ image, children, pathname, href } : Props) {
    return (
        <Link className={`${pathname == href ? '!bg-[#222222] text-white md:ml-3 md:rounded-r-none' : ''} flex max-w-full w-full bg-[#FAFBFF] py-5 px-5 gap-4 rounded-3xl items-center !transition-all`}
        href={href}>
            <Image src={image} width={20} height={20} alt="icon" className={pathname === href ? "invert" : "invert-0"} />
            {children}
        </Link>
    )
}

export default Tab;