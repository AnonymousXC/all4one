'use client'
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Tab from "./Tab";


function Sidebar() {

    const pathname = usePathname()
    const router = useRouter()
    const [ width, setSidebar ] = useState(false)
    
    if(typeof window !== 'undefined')
        {
            window.sidebar = width
            window.setSidebar = setSidebar
        }

    return (
        <section className={`
                left-0 flex overflow-hidden transition-all touch-none z-50 ${pathname.includes('user') ? '' : 'md:hidden'}
                fixed h-[calc(100vh_-_70px)] top-[70px] ${width ? 'w-full' : 'w-0'} w-0
                md:relative md:max-w-[220px] md:h-screen md:top-0 md:w-full
                bg-[#FAFBFF] justify-center items-center
                `}>
            {/* <h1>Logo</h1> */}
            <div className="flex flex-col gap-8 w-full mx-3">
                <Tab image="/icons/Home.svg" pathname={pathname} href="/user/dashboard" >
                    Dashboard
                </Tab>
                <Tab image="/icons/Credit.svg" pathname={pathname} href="/user/credits" >
                    Credits
                </Tab>
                <Tab image="/icons/Settings video camera.svg" pathname={pathname} href="/user/join" >
                    Audio
                </Tab>
                <Tab image="/icons/Miniplayer.svg" pathname={pathname} href="/" >
                    Miniplayer
                </Tab>
            </div>
        </section>
    )
}

export default Sidebar;