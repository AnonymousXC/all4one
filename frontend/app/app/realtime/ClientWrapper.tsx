'use client'
import NavBarClientSide from "@/components/global/navbar/NavigationBarClient";
import LanguageSelect from "./language";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import socket from "@/utils/Socket";
import AudioReceiver from "./receiver";


const AudioRecorder = dynamic(() => import('./recorder'), {
    ssr: false,
    loading: () => (
        <div className="flex gap-5 items-center justify-center animate-pulse">
            <div className="w-[60px] h-[60px] bg-red-300 rounded-full">
            </div>
        </div>)
});


function RealtimeClientWrapper() {

    const [firstLanguage, setFirstLanguage] = useState<string>("")
    const [secondLanguage, setSecondLanguage] = useState<string>("")
    const storageID1 = "first-lang"
    const storageID2 = "second-lang"

    useEffect(() => {
        socket.connect()
        setFirstLanguage(localStorage.getItem(storageID1) || '')
        setSecondLanguage(localStorage.getItem(storageID2) || '')
    }, [])

    return (
        <>
            <NavBarClientSide />
            <section className="flex justify-center items-center flex-col w-full h-[calc(100vh_-_80px)] bg-[#FBFCFF] gap-16 overflow-hidden">
                <div className="flex gap-10 max-w-full w-full justify-center md:flex-row flex-col">
                    <div className="flex flex-row gap-8 md:flex-col justify-center items-center">
                        <LanguageSelect language={firstLanguage} handleLanguageChange={(e) => { setFirstLanguage(e.currentTarget.value) }} storageID={storageID1} />
                        <AudioRecorder languageFrom={firstLanguage} languageTo={secondLanguage} />
                    </div>
                    <div className="flex flex-row gap-8 md:flex-col justify-center items-center">
                        <LanguageSelect language={secondLanguage} handleLanguageChange={(e) => { setSecondLanguage(e.currentTarget.value) }} storageID={storageID2} />
                        <AudioRecorder languageFrom={secondLanguage} languageTo={firstLanguage} />
                    </div>
                </div>
                <AudioReceiver />
            </section>
        </>
    )
}

export default RealtimeClientWrapper;