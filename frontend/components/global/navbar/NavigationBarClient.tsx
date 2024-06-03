'use client'
import { useEffect, useState } from "react";
import Dots from "./Dots";
import HamburgerMenuButton from "./Hamburger";
import UserDropDown from "./UserDropDown";
import getUser from "@/database/getUser";
import { UserResponse } from "@supabase/supabase-js";

function NavBarClientSide() {

    const [ username, setUsername ] = useState("")
    
    useEffect(() => {
        (async () => {
            const user = JSON.parse(await getUser()) as UserResponse
            if(user.data.user)
                setUsername(user.data.user.user_metadata.username)
            else
                setUsername('New user')
        })()
    }, [])

    return (
        <nav className="flex justify-between w-full h-20 py-5 px-4 items-center z-50 bg-white border-b-[1px]">
            <div className="hidden md:gap-10 items-center md:flex">
                <p className="hidden md:block">Logo</p>
                <Dots />
            </div>
            <HamburgerMenuButton />
            <UserDropDown name={username} />
        </nav>
    )
}

export default NavBarClientSide;