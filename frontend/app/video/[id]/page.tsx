'use client'
import LanguageModel from "@/components/global/Language/LanguageModal";
import NavBar2 from "@/components/global/navbar/Navigationbar2";
import PeerContext from "@/contexts/PeerContext";
import TranscriptionsContext from "@/contexts/TrancriptionsContext";
import WhisperContext from "@/contexts/WhisperContext";
import socket from "@/utils/Socket";
import useWhisper from "@octoai/use-whisper";
import { useParams } from "next/navigation";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import VideoAudioRecorder from "../VidAudioRecorder";
import VideoReceiver from "../VideoReceiver";
import { makeVideoCall, receiveCall } from "../CallFunctions";


function VideoCall() {

    const [peer, setPeer] = useState<Peer>()
    const [secondUser, setSecondUser] = useState<string | null>(null)
    const id = useParams().id
    const [translations, setTranslations] = useState([])
    const selfVideo = useRef<any>()
    const otherVideo = useRef<any>()
    const [ whisperLanguage, setWhisperLanguage ] = useState("en")

    const whisper = useWhisper(
        {
            apiKey: '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',
            apiUrl: 'https://api.openai.com/v1/audio/',
            mode: 'transcriptions',
            removeSilence: true,
            streaming: true,
            whisperConfig: {
                language: whisperLanguage
            }
        }
    )


    useEffect(() => {
        socket.connect()

        let peerLoc: Peer

        socket.once('connect', () => {

            const languageTo = localStorage.getItem('self-language')
            setWhisperLanguage(languageTo || 'en')

            peerLoc = new Peer(socket.id || 'retry')

            peerLoc.on('open', (userId: string) => {
                setPeer(peerLoc)
                socket.emit('join-video', { id })
            })

            socket.emit('join-call', { id: id })

            receiveCall(peerLoc, selfVideo, otherVideo)

        })

        socket.on('new-video-user', ({ userID }: { userID: string }) => {
            if (userID === peerLoc?.id) return
            setSecondUser(userID)
        })

        return () => {
            socket.disconnect()
        }


    }, [])


    return (
        <PeerContext.Provider value={peer}>
            <WhisperContext.Provider value={whisper}>
                <TranscriptionsContext.Provider value={{ translations, setTranslations }}>
                    <NavBar2 />
                    <section className="flex justify-center items-center flex-col w-full md:h-[calc(100vh_-_80px)] bg-[#FBFCFF]">
                        <div className="flex flex-col justify-between w-full h-full p-8 max-w-screen-xl gap-20 md:gap-2">

                            <div className="w-full md:mx-6">
                                <div className="bg-[#FBFBFB] border border-[rgba(0, 0, 0, 0.1)] rounded-2xl px-6 py-6 flex items-center flex-col gap-8">
                                    <div className="flex w-full justify-between">
                                        <h3 className="text-xl font-bold">Good evening!</h3>
                                        {/* <p> {date.toLocaleTimeString()} </p> */}
                                    </div>
                                    <VideoReceiver selfVideoRef={selfVideo} receiverVideoRef={otherVideo} />
                                    <VideoAudioRecorder callID={id} receiverID={secondUser} connectionFunc={() => {
                                        makeVideoCall(typeof peer === "undefined" ? new Peer() : peer, secondUser || "", selfVideo, otherVideo, )
                                    }} />
                                </div>
                            </div>
                        </div>
                        <LanguageModel />
                    </section>
                </TranscriptionsContext.Provider>
            </WhisperContext.Provider>
        </PeerContext.Provider>
    )
}

export default VideoCall;