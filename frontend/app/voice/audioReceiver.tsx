'use client'
import socket from "@/utils/Socket";
import { useEffect, useRef, useState } from "react";


function AudioReceiver() {

    let [filePath, setFilePath] = useState<Array<string>>([])
    const [captions, setCaptions] = useState<Array<string>>([])
    const [current, setCurrent] = useState(0)
    const audio = useRef<HTMLAudioElement>(null)

    const recMsg = (file: any) => {
        const blob = new Blob([file.buffer], { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        setCaptions(captions => [...captions, file.text])
        setFilePath(filePath => [...filePath, url])
        if (audio.current?.paused === true)
            audio.current?.load()
    }

    useEffect(() => {

        socket.on("receive-translation", recMsg)

        return () => {
            socket.off("receive-translation", recMsg)
            filePath.forEach((el : string, idx : number) => {
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
            <div className="w-full min-h-[350px] bg-main-purple rounded-2xl">
                {
                    captions.map((el: string, idx: number) => {
                        return <p key={idx}> {el} </p>
                    })
                }
            </div>
        </div>
    )
}

export default AudioReceiver;