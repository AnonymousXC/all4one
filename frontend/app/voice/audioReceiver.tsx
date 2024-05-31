'use client'
import socket from "@/utils/Socket";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface Captions {
    text: string,
    id: string
}

interface SocketData {
    buffer: Buffer,
    text: string,
    id: string,
}

interface TransciptionData {
    text: string,
    id: string
}

function AudioReceiver() {

    let [blobURL, setBlobURL] = useState<Array<string>>([])
    const [captions, setCaptions] = useState<Array<Captions>>([])
    const [current, setCurrent] = useState(0)
    let scrollDiv = useRef<HTMLDivElement>(null)
    const audio = useRef<HTMLAudioElement>(null)

    const recMsg = (data: SocketData) => {
        setCaptions(captions => [...captions, {text : data.text, id: data.id }])
        const blob = new Blob([data.buffer], { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        setBlobURL(blobURL => [...blobURL, url])
        if (audio.current?.paused === true && current === 0)
            audio.current?.load()
    }

    const receiveTransciption = (data : TransciptionData) => {
        if(data.id === socket.id)
            setCaptions(captions => [...captions, { text: data.text, id : data.id }])
    }

    useEffect(() => {

        socket.on("receive-translation", recMsg)
        socket.on("receive-transcription", receiveTransciption)

        return () => {
            socket.off("receive-translation", recMsg)
            socket.off("receive-transcription", receiveTransciption)
            blobURL.forEach((el : string, idx : number) => {
                URL.revokeObjectURL(el)
            })
        }

    }, [])

    useEffect(() => {
        scrollDiv.current?.scrollIntoView({behavior : 'smooth', block: 'end'})
    }, [captions])

    const handleAudioEnd = () => {
        if (blobURL[current + 1]) {
            setCurrent(current => current + 1)
            audio.current?.load()
        }
        else
            setCurrent(current => current + 1)
    }

    return (
        <div className="w-full px-8">
            <audio className="-z-50 absolute -top-96" ref={audio} controls autoPlay src={blobURL[current]} onEnded={handleAudioEnd}>
            </audio>
            <div className="w-full min-h-[350px] bg-main-purple rounded-2xl relative py-3">
                <div className="flex flex-col gap-4 flex-1 overflow-y-auto max-h-[calc(350px-1rem)] scrollbar">
                    {
                        captions &&
                        captions.map((el: Captions, idx: number) => {
                            return <MessageBox self={el.id === socket.id} text={el.text} key={idx} />
                        })
                    }
                    <div ref={scrollDiv}></div>
                </div>
            </div>
        </div>
    )
}

export default AudioReceiver;