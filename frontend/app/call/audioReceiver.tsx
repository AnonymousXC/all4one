'use client'
import socket from "@/utils/Socket";
import { useEffect, useRef, useState } from "react";


function AudioReceiver() {

    const [ filePath, setFilePath  ] = useState("")
    const audio = useRef<any>()

    const recMsg = (file : any ) => {
        setFilePath(file.filePath[0])
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
            <audio ref={audio} controls autoPlay src={`http://81.17.100.31:8081/audio/outputs${filePath}`}>
            </audio>
        </div>
    )
}

export default AudioReceiver;