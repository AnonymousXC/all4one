'use client'
import socket from "@/utils/Socket";
import { useEffect, useRef, useState } from "react";


function AudioReceiver() {

    const [ filePath, setFilePath  ] = useState("")
    const audio = useRef<any>()

    const recMsg = (file : any ) => {
        setFilePath(file.filePath)
        console.log(file.filePath)
        audio.current.load()
    }

    useEffect(() => {

        socket.on("receive-translation", recMsg)

        return () => {
            socket.off("receive-translation", recMsg)
        }

    }, [])

    return (
        <div>
            <audio ref={audio} controls autoPlay src={`http://localhost:8081/audio/outputs${filePath}`}>
            </audio>
        </div>
    )
}

export default AudioReceiver;