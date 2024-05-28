'use client'
import AudioReceiver from "@/app/voice/audioReceiver";
import AudioRecorder from "@/app/voice/audioRecorder";
import LanguageModel from "@/components/global/Language/LanguageModal";
import NavBar2 from "@/components/global/navbar/Navigationbar2";
import PeerContext from "@/contexts/PeerContext";
import TranscriptionsContext from "@/contexts/TrancriptionsContext";
import WhisperContext from "@/contexts/WhisperContext";
import socket from "@/utils/Socket";
import useWhisper from "@octoai/use-whisper";
import { useParams } from "next/navigation";
import Peer from "peerjs";
import { useEffect, useState } from "react";


function VideoCall() {

    const [ peer, setPeer ] = useState<Peer>()
    const [ secondUser, setSecondUser ] = useState<string>("")
    const id = useParams().id
    const whisper = useWhisper(
        {
            apiKey: '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',
            apiUrl: 'https://api.openai.com/v1/audio/',
            mode: 'transcriptions',
            removeSilence: true,
            streaming: true,
            whisperConfig: {
                language: "en"
            }
        }
    )
    const [ translations, setTranslations ] = useState([])

    useEffect(() => {
        if(socket.connected === false)
            socket.connect()
        const peerLoc = new Peer(socket.id || 'retry')
        setPeer(peerLoc)
        socket.emit('join-video', { id })
        socket.emit('join-call', { id: id })

        socket.on('new-video-user', ({ userID } : { userID : string }) => {
            if(userID === peerLoc?.id) return
            setSecondUser(userID)
            // console.log(peerLoc)
        })

    }, [])

    return (
        <PeerContext.Provider value={peer}>
            <WhisperContext.Provider value={whisper}>
                <TranscriptionsContext.Provider value={{translations, setTranslations}}>
                    <NavBar2 />
                    Your Peer id : { peer?.id } <br />
                    Receiver&apos;s peer id : { secondUser }
                    <AudioReceiver />
                    <AudioRecorder callID={id} />
                    <LanguageModel />
                </TranscriptionsContext.Provider>
            </WhisperContext.Provider>
        </PeerContext.Provider>
    )
}

export default VideoCall;