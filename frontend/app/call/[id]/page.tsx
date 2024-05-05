'use client'
import socket from "@/utils/Socket";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import AudioRecorder from "../audioRecorder";
import AudioReceiver from "../audioReceiver";


function CallPage() {

    const id = useParams()['id']
    
    useEffect(() => {
        socket.emit('join-call', { id : id })
    }, [])

    return (
        <div className="relative py-24 h-screen">

            <AudioRecorder callID={id} />
            <AudioReceiver />

        </div>
    )
}

export default CallPage;