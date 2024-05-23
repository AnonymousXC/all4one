'use client'
import socket from "@/utils/Socket";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import AudioRecorder from "../audioRecorder";
import AudioReceiver from "../audioReceiver";
import StatsForNerds from "@/components/Stats";
import LanguageModel from "@/components/global/Language/LanguageModal";


function CallPage() {

    const id = useParams()['id']

    useEffect(() => {
        const languageTo = localStorage.getItem('self-language')
        socket.emit('join-call', { id : id, languageTo })
    }, [])

    return (
        <div className="relative py-24 h-screen">

            <AudioRecorder callID={id} />
            <AudioReceiver />
            <StatsForNerds />
            <LanguageModel />

        </div>
    )
}

export default CallPage;