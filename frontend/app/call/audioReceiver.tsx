'use client'
import socket from "@/utils/Socket";
import { useEffect, useState } from "react";


function AudioReceiver() {

    const [ message, setMessage ] = useState("")

    const recMsg = ({ text } : { text : string } ) => {
        setMessage(text)
        const msg = new SpeechSynthesisUtterance()
        msg.text = text;
        window.speechSynthesis.speak(msg)
    }

    useEffect(() => {

        socket.on("receive-translation", recMsg)

        return () => {
            socket.off("receive-translation", recMsg)
        }

    }, [])

    return (
        <div>
            {message}
        </div>
    )
}

export default AudioReceiver;