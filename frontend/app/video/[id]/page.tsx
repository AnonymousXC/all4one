'use client'
import LanguageModel from "@/components/global/Language/LanguageModal";
import PeerContext from "@/contexts/PeerContext";
import TranscriptionsContext from "@/contexts/TrancriptionsContext";
import socket from "@/utils/Socket";
import { useParams } from "next/navigation";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import VideoReceiver from "../VideoReceiver";
import { makeVideoCall, receiveCall } from "../CallFunctions";
import dynamic from "next/dynamic";
import Sidebar from "@/components/global/sidebar/Sidebar";
import NavBarClientSide from "@/components/global/navbar/NavigationBarClient";

const VideoAudioRecorder = dynamic(() => import("../VidAudioRecorder"), {ssr : false})

function VideoCall() {

    const [peer, setPeer] = useState<Peer>()
    const [secondUser, setSecondUser] = useState<string | null>(null)
    const id = useParams().id
    const [translations, setTranslations] = useState([])
    const selfVideo = useRef<any>()
    const otherVideo = useRef<any>()


    useEffect(() => {
        socket.connect()

        let peerLoc: Peer

        socket.once('connect', () => {

            peerLoc = new Peer(socket.id || 'retry')

            peerLoc.on('open', (userId: string) => {
                setPeer(peerLoc)
                socket.emit('join-video', { id })
            })

            socket.emit('join-call', { id: id })

            receiveCall(peerLoc, selfVideo, otherVideo)

        })

        socket.on('new-user-joined', ({ id }: { id: string }) => {
            if (id === peerLoc?.id) return
            setSecondUser(id)
        })

        return () => {
            socket.disconnect()
        }


    }, [])


    return (
        <PeerContext.Provider value={peer}>
            <TranscriptionsContext.Provider value={{ translations, setTranslations }}>
                <NavBarClientSide />
                <Sidebar />
                <section className="flex justify-center items-center flex-col w-full md:h-[calc(100vh_-_80px)] bg-[#FBFCFF]">
                    <div className="flex flex-col justify-between w-full h-full p-8 max-w-screen-xl gap-20 md:gap-2">

                        <div className="w-full md:mx-6">
                            <div className="bg-[#FBFBFB] border border-[rgba(0, 0, 0, 0.1)] rounded-2xl px-6 py-6 flex items-center flex-col gap-8">
                                <div className="flex w-full justify-between">
                                    <h3 className="text-xl font-bold">Good evening!</h3>
                                </div>
                                <VideoReceiver selfVideoRef={selfVideo} receiverVideoRef={otherVideo} />
                                <VideoAudioRecorder callID={id} receiverID={secondUser} connectionFunc={() => {
                                    makeVideoCall(typeof peer === "undefined" ? new Peer() : peer, secondUser || "", selfVideo, otherVideo,)
                                }} />
                            </div>
                        </div>
                    </div>
                    <LanguageModel />
                </section>
            </TranscriptionsContext.Provider>
        </PeerContext.Provider>
    )
}

export default VideoCall;