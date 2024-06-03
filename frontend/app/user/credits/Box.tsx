import { ReactNode } from "react";


function Box({ children } : { children? : ReactNode }) {
    return (
        <div className="flex justify-center items-center w-full h-full bg-white max-w-[300px] max-h-[300px] rounded-2xl border p-10">
            {children}
        </div>
    )
}

export default Box;