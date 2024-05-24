'use client'
import { Menu, X } from "@/utils/iconsExports";
import { useState } from "react";


function HamburgerMenuButton() {

    const [sidebar, setSidebar] = useState(false)

    return (
        <button className="block md:hidden"
            onClick={() => {
                if (window.setSidebar && typeof window.sidebar === 'boolean') {
                    setSidebar(!window.sidebar)
                    window.setSidebar(!window.sidebar)
                }
            }}>
            {
                sidebar ? <X size={'30'} /> : <Menu size={'30'} />
            }
        </button>
    )
}

export default HamburgerMenuButton;