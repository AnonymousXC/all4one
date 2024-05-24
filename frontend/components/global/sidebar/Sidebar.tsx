'use client'
import { usePathname } from "next/navigation";
import Button from "./Button";
import { useRouter } from "next/navigation";


function Sidebar() {

    const pathname = usePathname()
    const router = useRouter() 

    return (
        <section className={`
                left-0 flex overflow-hidden w-0
                fixed h-[calc(100vh_-_70px)] top-[70px]
                md:relative md:max-w-[220px] md:h-screen md:top-0 md:w-full
                bg-main-blue justify-center items-center
                `}>
            {/* <h1>Logo</h1> */}
            <div className="flex flex-col gap-8 w-full mx-3">
                <Button image="/icons/Home.svg" active={pathname == '/user/dashboard' ? true : false} redirector={() => { router.push('/user/dashboard') }}>
                    Dashboard
                </Button>
                <Button image="/icons/Credit.svg" active={pathname == '/user/credits' ? true : false} redirector={() => { router.push('/user/credits') }}>
                    Credits
                </Button>
                <Button image="/icons/Settings video camera.svg" active={pathname == '/user/setting' ? true : false} redirector={() => { router.push('/user/setting') }}>
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