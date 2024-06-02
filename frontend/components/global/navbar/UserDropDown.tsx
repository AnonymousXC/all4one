'use client'
import logout from "@/database/logout";
import { ChevronDown } from "@/utils/iconsExports";
import { ChevronUp } from "@styled-icons/boxicons-regular";
import { useState } from "react";
import { toast } from "react-toastify";


function UserDropDown() {

    const [ dropdown, setDropdown ] = useState(false)

    return (
        <>
            <div className="bg-[#E9E3FF] flex py-1 px-1 rounded-3xl items-center justify-between min-w-36 relative">
                <div className="flex gap-2 items-center">
                    <img src="https://avatars3.githubusercontent.com/u/100200?s=460&v=4" className="w-10 h-10 rounded-full"></img>
                    <p className="font-[500]">Josh</p>
                </div>
                <button className="pr-2" onClick={() => { setDropdown(!dropdown) }}>
                    {
                        dropdown ? <ChevronUp size={'25PX'} /> : <ChevronDown size={'25px'} />
                    }
                </button>
                <div className={`absolute bottom-0 top-full left-0 flex flex-col w-full bg-slate-200 rounded-2xl mt-2 overflow-hidden transition-all ${dropdown ? 'h-min' : 'h-0'}`}>
                    <button className='py-3 hover:bg-slate-900 hover:text-white transition-colors bg-slate-200 rounded-t-2xl'>
                        lorem
                    </button>
                    <button className='py-3 hover:bg-slate-900 hover:text-white transition-colors bg-slate-200'>
                        lorem
                    </button>
                    <button className='py-3 hover:bg-slate-900 hover:text-white transition-colors rounded-b-2xl bg-slate-200' 
                    onClick={() => { 
                        toast.info("Logging out.")
                        logout() 
                    }}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserDropDown;