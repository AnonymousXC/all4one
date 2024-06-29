'use client'
import socket from "@/utils/Socket";
import { useEffect, useRef, useState } from "react";

interface SocketData {
    buffer: Buffer,
}


function AudioReceiver() {

    let [blobURL, setBlobURL] = useState<Array<string>>([])
    const [current, setCurrent] = useState(0)
    const audio = useRef<HTMLAudioElement>(null)
    const [status, setStatus] = useState("Ideal")

    const recMsg = (data: SocketData) => {
        const blob = new Blob([data.buffer], { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        setBlobURL(blobURL => [...blobURL, url])
        if (audio.current?.paused === true && current === 0)
            audio.current?.load()
    }

    useEffect(() => {

        socket.on("realtime-output", recMsg)
        socket.on('realtime-status', (data : any) => {
            setStatus(data.text)
        })

        return () => {
            socket.off("realtime-output", recMsg)


            blobURL.forEach((el: string, idx: number) => {
                URL.revokeObjectURL(el)
            })
        }

    }, [])

    const handleAudioEnd = () => {
        if (blobURL[current + 1]) {
            setCurrent(current => current + 1)
            audio.current?.load()
        }
        else
            setCurrent(current => current + 1)
    }

    return (
        <div className="flex flex-col gap-3 w-full px-8 items-center">
            <audio className="-z-50 absolute -top-96" ref={audio} controls autoPlay src={blobURL[current]} onEnded={handleAudioEnd}>
            </audio>
            <div className={`dropdown text-center ${status === 'Processing...' ? "bg-[#362360] text-white" : "" }`}>Status - {status} </div>
        </div>
    )
}

export default AudioReceiver;