import { ChevronDown } from "@/utils/iconsExports";


function UserDropDown() {
    return (
        <>
            <div className="bg-[#E9E3FF] flex py-1 px-1 rounded-3xl items-center justify-between min-w-36">
                <div className="flex gap-2 items-center">
                    <img src="https://avatars3.githubusercontent.com/u/100200?s=460&v=4" className="w-10 h-10 rounded-full"></img>
                    <p className="font-[500]">Josh</p>
                </div>
                <button className="pr-2">
                    <ChevronDown size={'25px'} />
                </button>
            </div>
        </>
    )
}

export default UserDropDown;