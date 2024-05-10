'use client'
import socket from "@/utils/Socket";
import { useEffect, useRef, useState } from "react";


function AudioReceiver() {

    let [ filePath, setFilePath  ] = useState<Array<string>>([])
    const [ captions, setCaptions ] = useState<Array<string>>([])
    const [ current, setCurrent ] = useState(0)
    const audio = useRef<HTMLAudioElement>(null)

    const recMsg = (file : any ) => {
        filePath.push(file.filePath[0])
        setCaptions([...captions, file.text])
        setFilePath(filePath)
        if(audio.current?.src.includes("undefined"))
            audio.current?.load()
        console.log(file.text)
    }

    useEffect(() => {

        socket.on("receive-translation", recMsg)

        return () => {
            socket.off("receive-translation", recMsg)
        }

    }, [])

    const handleAudioEnd = () => {
        setCurrent(current + 1)
        audio.current?.load()
    }

    return (
        <div>
            <audio ref={audio} controls autoPlay src={`https://all4one-production.up.railway.app/audio/outputs${filePath[current]}`} onEnded={handleAudioEnd}>
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