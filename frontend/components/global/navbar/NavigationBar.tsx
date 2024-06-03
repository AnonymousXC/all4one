import getUser from "@/database/getUser";
import Dots from "./Dots";
import HamburgerMenuButton from "./Hamburger";
import UserDropDown from "./UserDropDown";

async function NavBar() {

    const user = await getUser()

    return (
        <nav className="flex justify-between w-full h-20 py-5 px-4 items-center z-50">
            <Dots />
            <HamburgerMenuButton />
            <UserDropDown name={user.data.user?.user_metadata.username} />
        </nav>
    )
}

export default NavBar;