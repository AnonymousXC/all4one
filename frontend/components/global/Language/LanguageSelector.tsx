'use client'
import socket from "@/utils/Socket";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";


function LanguageSelector() {

    const [language, setLanguage] = useState("")
    const pathname = usePathname()

    const handleLanguageChange = (e: FormEvent<HTMLSelectElement>) => {
        const languageSelected = e.currentTarget.value
        localStorage.setItem('self-language', languageSelected)
        setLanguage(languageSelected)
        socket.emit('set-langauge', { language: languageSelected })
        if(pathname === "/user/join") return
        window.location.reload()
    }

    useEffect(() => {
        const getLanguage = localStorage.getItem('self-language')
        if (getLanguage && getLanguage !== undefined && getLanguage !== null) {
            setLanguage(getLanguage || '')
            socket.emit('set-langauge', { language: getLanguage })
        }
    }, [])

    return (
        <>
            <label htmlFor="countries" className="block mb-2 text-base font-medium mt-4">Select your language</label>
            <div className="dropdown-wrapper">
                <select id="countries" value={language} className="dropdown" onChange={handleLanguageChange}>
                    <option value={0}>Choose your language</option>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="de">German</option>
                    <option value="fr">French</option>
                    <option value="zh">Mandarin</option>
                    <option value="es">Spanish</option>
                    <option value="ko">Korean</option>
                    <option value="pt">Portuguese</option>
                    <option value="ja">Japanese</option>
                    <option value="ru">Russian</option>
                    <option value="ur">Urdu</option>
                </select>
            </div>
        </>
    )
}

export default LanguageSelector;