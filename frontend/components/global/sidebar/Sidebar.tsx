'use client'
import { usePathname } from "next/navigation";
import Button from "./Button";
import { useRouter } from "next/navigation";


function Sidebar() {

    const pathname = usePathname()
    const router = useRouter()

    return (
        <section className="relative left-0 top-0 flex w-full max-w-[220px] h-screen bg-main-blue justify-center items-center">
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
                {/* <Button image="/icons/Playback.svg" active={pathname == '' ? true : false} redirector={() => { router.push('') }}>
                    Playback
                </Button> */}
            </div>
        </section>
    )
}

export default Sidebar;