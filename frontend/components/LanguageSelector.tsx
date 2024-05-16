import { FormEvent, useEffect, useState } from "react";


function LanguageSelector() {

    const [ language, setLanguage ] = useState("")

    const handleLanguageChange = (e : FormEvent<HTMLSelectElement>) => {
        const languageSelected = e.currentTarget.value
        localStorage.setItem('self-language', languageSelected)
        setLanguage(languageSelected)
    }

    useEffect(() => {
        const getLanguage = localStorage.getItem('self-language')
        setLanguage(getLanguage || '')
    }, [])

    return (
        <>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 mt-4">Select your language</label>
            <select id="countries" value={language} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleLanguageChange}>
                <option value={0}>Choose your language</option>
                <option value="EN">English</option>
                <option value="HI">Hindi</option>
                <option value="DE">German</option>
                <option value="FR">French</option>
            </select>
        </>
    )
}

export default LanguageSelector;