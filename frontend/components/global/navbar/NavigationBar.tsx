import Dots from "./Dots";
import HamburgerMenuButton from "./Hamburger";
import UserDropDown from "./UserDropDown";

function NavBar() {
    return (
        <nav className="flex justify-between w-full h-20 py-5 px-4 items-center z-50">
            <Dots />
            <HamburgerMenuButton />
            <UserDropDown />
        </nav>
    )
}

export default NavBar;