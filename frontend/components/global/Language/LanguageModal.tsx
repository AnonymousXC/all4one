import { useEffect, useState } from "react";
import LanguageSelector from "./LanguageSelector";


function LanguageModel() {

    const [ display, setDisplay ] = useState("hidden")
    const [ btnText, setBtnText ] = useState("Close Selector")

    useEffect(() => {
        const getLanguage = localStorage.getItem('self-language')
        console.log(getLanguage)
        if(!getLanguage)
        {
            setDisplay("flex")
        }
    }, [])

    const handleClose = () => {
        const getLanguage = localStorage.getItem('self-language')
        if(getLanguage)
            setDisplay("hidden")
        else
            setBtnText("Pls select a language")
    }

    return (
        <div className={`${display} flex-col justify-around items-center absolute w-full h-[200px] max-w-[500px] bg-slate-400 rounded-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8`}>
            <LanguageSelector />
            <button className="bg-black text-white py-2 rounded-xl w-full hover:bg-red-500 transition-colors" onClick={handleClose}>
                {btnText}
            </button>
        </div>
    )
}

export default LanguageModel;