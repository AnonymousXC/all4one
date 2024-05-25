import Dots from "./Dots";
import HamburgerMenuButton from "./Hamburger";
import UserDropDown from "./UserDropDown";

function NavBar2() {
    return (
        <nav className="flex justify-between w-full h-20 py-5 px-4 items-center z-50 bg-white border-b-[1px]">
            <div className="flex md:gap-10 items-center">
                <p>Logo</p>
                <Dots />
            </div>
            <HamburgerMenuButton />
            <UserDropDown />
        </nav>
    )
}

export default NavBar2;