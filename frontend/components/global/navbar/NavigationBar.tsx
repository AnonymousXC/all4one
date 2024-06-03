'use server'
import getUser from "@/database/getUser";
import Dots from "./Dots";
import HamburgerMenuButton from "./Hamburger";
import UserDropDown from "./UserDropDown";
import { UserResponse } from "@supabase/supabase-js";

async function NavBar() {

    const user = JSON.parse(await getUser()) as UserResponse;

    return (
        <nav className="flex justify-between w-full h-20 py-5 px-4 items-center z-50">
            <Dots />
            <HamburgerMenuButton />
            <UserDropDown name={user.data.user?.user_metadata.username} />
        </nav>
    )
}

export default NavBar;