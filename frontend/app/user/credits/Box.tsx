import { ReactNode } from "react";


function Box({ children } : { children? : ReactNode }) {
    return (
        <div className="flex justify-center items-center w-full h-full min-w-[300px] min-h-[300px] bg-white md:max-w-[300px] md:max-h-[300px] rounded-2xl border p-10">
            {children}
        </div>
    )
}

export default Box;