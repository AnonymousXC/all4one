'use client'
import TranscriptionsContext from "@/contexts/TrancriptionsContext";
import WhisperContext from "@/contexts/WhisperContext";
import socket from "@/utils/Socket";
import { useContext, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";


function AudioReceiver() {

    let [filePath, setFilePath] = useState<Array<string>>([])
    const [current, setCurrent] = useState(0)
    const audio = useRef<HTMLAudioElement>(null)

    const {
        transcript,
    } = useContext(WhisperContext)
    const { translations, setTranslations } = useContext(TranscriptionsContext)

    const recMsg = (file: any) => {
        const blob = new Blob([file.buffer], { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        setTranslations((translations : any) => [...translations, { text : file.text, self: false }])
        setFilePath(filePath => [...filePath, url])
        if (audio.current?.paused === true)
            audio.current?.load()
    }

    useEffect(() => {

        socket.on("receive-translation", recMsg)

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
        <div className="w-full px-8">
            <audio className="-z-50 absolute -top-96" ref={audio} controls autoPlay src={filePath[current]} onEnded={handleAudioEnd}>
            </audio>
            <div className="w-full min-h-[350px] bg-main-purple rounded-2xl relative py-4">
                <div className="flex flex-col gap-4 flex-1 overflow-y-auto max-h-[calc(350px-5rem)]">
                    {
                        translations.map((el: any, idx: number) => {
                            return <MessageBox self={el.self} text={el.text} key={idx} />
                        })
                    }
                </div>
                <div className="bg-purple-500 w-full absolute bottom-0 rounded-b-2xl py-3 text-white px-3 max-h-16 overflow-y-auto">
                    { transcript.text }
                </div>
            </div>
        </div>
    )
}

export default AudioReceiver;