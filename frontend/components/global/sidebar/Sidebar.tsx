'use client'
import { usePathname } from "next/navigation";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useState } from "react";


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
                left-0 flex overflow-hidden transition-all touch-none z-50
                fixed h-[calc(100vh_-_70px)] top-[70px] ${width ? 'w-full' : 'w-0'} w-0
                md:relative md:max-w-[220px] md:h-screen md:top-0 md:w-full
                bg-[#FAFBFF] justify-center items-center
                `}>
            {/* <h1>Logo</h1> */}
            <div className="flex flex-col gap-8 w-full mx-3">
                <Button image="/icons/Home.svg" active={pathname == '/user/dashboard' ? true : false} redirector={() => { router.push('/user/dashboard') }}>
                    Dashboard
                </Button>
                <Button image="/icons/Credit.svg" active={pathname == '/user/credits' ? true : false} redirector={() => { router.push('/user/credits') }}>
                    Credits
                </Button>
                <Button image="/icons/Settings video camera.svg" active={pathname == '/user/join' ? true : false} redirector={() => { router.push('/user/join') }}>
                    Audio
                </Button>
                <Button image="/icons/Miniplayer.svg" active={pathname == '' ? true : false} redirector={() => { router.push('') }}>
                    Miniplayer
                </Button>
            </div>
        </section>
    )
}

export default Sidebar;