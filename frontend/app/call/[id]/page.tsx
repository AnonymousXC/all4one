'use client'
import socket from "@/utils/Socket";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import AudioRecorder from "../audioRecorder";


function CallPage() {

    const id = useParams()['id']
    
    useEffect(() => {
        socket.emit('join-call', { id : id })
    }, [])

    return (
        <div className="relative py-24 h-screen">

            <AudioRecorder callID={id} />

        </div>
    )
}

export default CallPage;