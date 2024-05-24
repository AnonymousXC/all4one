'use client'
import { SidebarContext } from "@/contexts/SidebarContext";
import { Menu } from "@/utils/iconsExports";
import { useContext } from "react";


function HamburgerMenuButton() {

    const sidebar = useContext(SidebarContext)

    return (
        <button className="block md:hidden"
        onClick={() => {
            console.log(sidebar)
        }}>
            <Menu size={'30'} />
        </button>
    )
}

export default HamburgerMenuButton;