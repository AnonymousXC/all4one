import socket from "@/utils/Socket";
import { FormEvent, useEffect, useState } from "react";


function LanguageSelector() {

    const [ language, setLanguage ] = useState("")

    const handleLanguageChange = (e : FormEvent<HTMLSelectElement>) => {
        const languageSelected = e.currentTarget.value
        localStorage.setItem('self-language', languageSelected)
        setLanguage(languageSelected)
        socket.emit('set-langauge', { language : languageSelected })
    }

    useEffect(() => {
        const getLanguage = localStorage.getItem('self-language')
        setLanguage(getLanguage || '')
    }, [])

    return (
        <>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 mt-4">Select your language</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleLanguageChange}>
                <option value={0}>Choose your language</option>
                <option value="ENGLISH">English</option>
                <option value="HINDI">Hindi</option>
                <option value="GERMAN">German</option>
                <option value="FRENCH">French</option>
            </select>
        </>
    )
}

export default LanguageSelector;