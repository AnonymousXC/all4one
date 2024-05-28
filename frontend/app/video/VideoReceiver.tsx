'use client'
import TranscriptionsContext from "@/contexts/TrancriptionsContext";
import WhisperContext from "@/contexts/WhisperContext";
import socket from "@/utils/Socket";
import languages from "@/utils/languageMap";
import { useContext, useEffect, useRef, useState } from "react";

type Props = {
    selfVideoRef: any,
    receiverVideoRef: any,
}

function VideoReceiver({ selfVideoRef, receiverVideoRef }: Props) {

    let [filePath, setFilePath] = useState<Array<string>>([])
    const [current, setCurrent] = useState(0)
    const audio = useRef<HTMLAudioElement>(null)
    const [ selfLanguage, setSelfLanguage ] = useState<string | null>(null)
    const [ receiverLanguage, setReceiverLanguage ] = useState<string | null>(null)

    const {
        transcript,
    } = useContext(WhisperContext)
    const { translations, setTranslations } = useContext(TranscriptionsContext)

    const recMsg = (file: any) => {
        const blob = new Blob([file.buffer], { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        setTranslations((translations: any) => [...translations, { text: file.text, self: false }])
        setFilePath(filePath => [...filePath, url])
        if (audio.current?.paused === true)
            audio.current?.load()
    }

    useEffect(() => {

        socket.on("receive-translation", recMsg)
        const selfLang = localStorage.getItem("self-language")
        // @ts-expect-error
        setSelfLanguage(languages[selfLang])

        socket.on('new-video-user', ({ userID, lang }: { userID: string, lang : string }) => {
            if(userID === socket.id) return;
            // @ts-expect-error
            setReceiverLanguage(languages[lang])
        })

        return () => {
            socket.off("receive-translation", recMsg)
            filePath.forEach((el: string, idx: number) => {
                URL.revokeObjectURL(el)
            })
        }

    }, [])

    const handleAudioEnd = () => {
        if (filePath[current + 1]) {
            setCurrent(current => current + 1)
            audio.current?.load()
        }
    }

    return (
        <div className="flex justify-around w-full px-8 flex-wrap gap-4">
            <audio className="-z-50 absolute -top-96" ref={audio} controls autoPlay src={filePath[current]} onEnded={handleAudioEnd}>
            </audio>
            <div className="flex flex-col max-w-[450px] max-h-[350px] w-full h-screen">
                <video src="" ref={selfVideoRef} className=" bg-main-purple w-full h-full rounded-2xl"></video>
                <p className="mt-4 bg-main-purple py-2 px-6 rounded-2xl max-w-[200px]"> {selfLanguage === null ? "Select a language" : selfLanguage} </p>
            </div>
            <div className="flex flex-col max-w-[450px] max-h-[350px] w-full h-screen">
                <video src="" ref={receiverVideoRef} className="bg-main-purple w-full h-full rounded-2xl"></video>
                <p className="mt-4 bg-[#362360] py-2 px-6 rounded-2xl max-w-[200px] text-white"> {receiverLanguage === null ? "Waiting for user" : receiverLanguage } </p>
            </div>
        </div>
    )
}

export default VideoReceiver;