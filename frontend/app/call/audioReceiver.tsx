'use client'
import socket from "@/utils/Socket";
import { useEffect, useRef, useState } from "react";


function AudioReceiver() {

    let [ filePath, setFilePath  ] = useState<Array<string>>([])
    const [ captions, setCaptions ] = useState<Array<string>>([])
    const [ current, setCurrent ] = useState(0)
    const audio = useRef<HTMLAudioElement>(null)

    const recMsg = (file : any ) => {
        setCaptions(captions => [...captions, file.text])
        setFilePath(filePath => [...filePath, file.filePath])
        audio.current?.load()
    }

    useEffect(() => {

        socket.on("receive-translation", recMsg)

        return () => {
            socket.off("receive-translation", recMsg)
        }

    }, [])

    const handleAudioEnd = () => {
        setCurrent(current => current + 1)
        audio.current?.load()
    }

    return (
        <div className="absolute -z-50">
            <audio ref={audio} controls autoPlay src={process.env.NODE_ENV === 'development' ? `http://localhost:8081/audio/outputs${filePath[current]}` : `https://all4one-production.up.railway.app/audio/outputs${filePath[current]}`} onEnded={handleAudioEnd}>
            </audio>
            {
                captions.map((el: string, idx: number) => {
                    return <p key={idx}> {el} </p>
                })
            }
        </div>
    )
}

export default AudioReceiver;