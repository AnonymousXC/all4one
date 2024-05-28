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
import Peer, { MediaConnection } from "peerjs";
import { useEffect, useRef, useState } from "react";


function VideoCall() {

    const [peer, setPeer] = useState<Peer>()
    const [secondUser, setSecondUser] = useState<string>("")
    const id = useParams().id
    const [translations, setTranslations] = useState([])
    const selfVideo = useRef<any>()
    const otherVideo = useRef<any>()

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


    useEffect(() => {
        if (socket.connected === false)
            socket.connect()
        
        const peerLoc = new Peer(socket.id || 'retry')

        peerLoc.on('open', (id : string) => {
            setPeer(peerLoc)
        })

        socket.emit('join-video', { id })
        socket.emit('join-call', { id: id })
        
        recieveCall(peerLoc)
        
        socket.on('new-video-user', ({ userID }: { userID: string }) => {
            if (userID === peerLoc?.id) return
            setSecondUser(userID)
        })

    }, [])


    function makeVideoCall(userID: string) {
        // @ts-expect-error
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true, audio: false }, function (stream: any) {
            selfVideo.current.srcObject = stream;
            selfVideo.current.play()
            var call = peer?.call(userID, stream);
            call?.on('stream', function (remoteStream) {
                otherVideo.current.srcObject = remoteStream
                otherVideo.current?.play()
            });
        }, function (err: any) {
            console.log('Failed to get local stream', err);
        });
    }

    function recieveCall(peer: Peer) {
        peer.on('call', function (call : MediaConnection) {
            // @ts-expect-error
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ video: true, audio: false }, function (stream: any) {
                selfVideo.current.srcObject = stream;
                selfVideo.current?.play()
                call.answer(stream); // Answer the call with an A/V stream.
                call.on('stream', function (remoteStream) {
                    otherVideo.current.srcObject = remoteStream
                    otherVideo.current?.play()
                });
            }, function (err: any) {
                console.log('Failed to get local stream', err);
            });
        });
    }

    return (
        <PeerContext.Provider value={peer}>
            <WhisperContext.Provider value={whisper}>
                <TranscriptionsContext.Provider value={{ translations, setTranslations }}>
                    <NavBar2 />
                    Your Peer id : {peer?.id} <br />
                    Receiver&apos;s peer id : {secondUser}
                    <AudioReceiver />
                    <AudioRecorder callID={id} />
                    <LanguageModel />
                </TranscriptionsContext.Provider>
            </WhisperContext.Provider>
            <div>
                self
                <video src="" ref={selfVideo}></video>
            </div>
            <div>
                other
                <video src="" ref={otherVideo}></video>
            </div>
            <button onClick={() => {
            makeVideoCall(secondUser)
            }}>Call</button>
        </PeerContext.Provider>
    )
}

export default VideoCall;