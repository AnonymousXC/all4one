'use client'
import NavBarClientSide from "@/components/global/navbar/NavigationBarClient";
import LanguageSelect from "./language";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import socket from "@/utils/Socket";
import AudioReceiver from "./receiver";

const AudioRecorder = dynamic(() => import('./recorder'), { ssr : false });


function Realtime() {

    const [ firstLanguage, setFirstLanguage ] = useState<string>("")
    const [ secondLanguage, setSecondLanguage ] = useState<string>("")

    useEffect(() => {
        socket.connect()
    }, [])

    return (
        <>
            <NavBarClientSide />
            <section className="flex justify-center items-center flex-col w-full md:h-[calc(100vh_-_80px)] bg-[#FBFCFF] gap-16">
                <div className="flex gap-10">
                    <div className="flex flex-col gap-8">
                        <LanguageSelect language={firstLanguage} handleLanguageChange={(e) => { setFirstLanguage(e.currentTarget.value) }} />
                        <AudioRecorder languageFrom={firstLanguage} languageTo={secondLanguage} />
                    </div>
                    <div className="flex flex-col gap-8">
                        <LanguageSelect language={secondLanguage} handleLanguageChange={(e) => { setSecondLanguage(e.currentTarget.value) }} />
                        <AudioRecorder languageFrom={secondLanguage} languageTo={firstLanguage} />
                    </div>
                </div>
                <AudioReceiver />
            </section>
        </>
    )
}

export default Realtime;