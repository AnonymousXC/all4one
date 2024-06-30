import { FormEvent, useEffect } from "react";

type Props = {
    language: string,
    handleLanguageChange: (e: FormEvent<HTMLSelectElement>) => any,
    storageID: string
}

function LanguageSelect({ language, handleLanguageChange, storageID }: Props) {
    return (
        <div className="dropdown-wrapper">
            <select className="dropdown" value={language}
                onChange={(e) => {
                    handleLanguageChange(e);
                    localStorage.setItem(storageID, e.currentTarget.value)
                }}>
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
    )
}

export default LanguageSelect;