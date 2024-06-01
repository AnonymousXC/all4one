'use client'
import socket from "@/utils/Socket";
import languages from "@/utils/languageMap";
import { useEffect, useRef, useState } from "react";

type Props = {
    selfVideoRef: any,
    receiverVideoRef: any,
}

interface Captions {
    text: string,
    id: string
}

interface SocketData {
    buffer: Buffer,
    text: string,
    id: string,
}

interface TransciptionData {
    text: string,
    id: string
}

function VideoReceiver({ selfVideoRef, receiverVideoRef }: Props) {

    let [blobURL, setBlobURL] = useState<Array<string>>([])
    const [current, setCurrent] = useState(0)
    const [captions, setCaptions] = useState<Array<Captions>>([])
    const audio = useRef<HTMLAudioElement>(null)
    const [selfServerLang, setSelfServerLang] = useState<string>("Waiting for user...")
    const [receiverServerLang, setReceiverServerLang] = useState<string>("Waiting for user...")
    const [lastTranslation, setLastTranslation] = useState("")
    const [lastTranscription, setLastTranscription] = useState("")
    const [selfSpeaking, setSelfSpeaking] = useState(false)
    const [receiverSpeaking, setReceiverSpeaking] = useState(false)


    const recMsg = (data: SocketData) => {
        setCaptions(captions => [...captions, { text: data.text, id: data.id }])
        const blob = new Blob([data.buffer], { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        setBlobURL(blobURL => [...blobURL, url])
        if (audio.current?.paused === true && current === 0)
            audio.current?.load()
        setLastTranslation(data.text)
    }

    const receiveTransciption = (data: TransciptionData) => {
        if (data.id === socket.id) {
            setLastTranscription(data.text)
            setCaptions(captions => [...captions, { text: data.text, id: data.id }])
        }
    }

    const newVideoUserJoin = ({ userID, lang }: { userID: string, lang: any }) => {
        Object.keys(lang).forEach((el) => {
            if (el === socket.id)
                // @ts-expect-error
                setSelfServerLang(languages[lang[el]])
            else
                // @ts-expect-error
                setReceiverServerLang(languages[lang[el]])
        })
    }

    const onSpeakStart = (data: { id: string }) => {
        if (data.id === socket.id)
            setSelfSpeaking(true)
        else
            setReceiverSpeaking(true)
    }

    const onSpeakEnd = (data: { id: string }) => {
        if (data.id === socket.id)
            setSelfSpeaking(false)
        else
            setReceiverSpeaking(false)
    }

    useEffect(() => {

        socket.on("receive-translation", recMsg)
        socket.on("receive-transcription", receiveTransciption)
        socket.on('new-user-joined', newVideoUserJoin)
        socket.on('speech-start', onSpeakStart)
        socket.on('speech-end', onSpeakEnd)

        return () => {
            socket.off("receive-translation", recMsg)
            socket.off('new-video-user', newVideoUserJoin)
            socket.off("receive-transcription", receiveTransciption)
            socket.off('speech-start', onSpeakStart)
            socket.off('speech-end', onSpeakEnd)
            blobURL.forEach((el: string, idx: number) => {
                URL.revokeObjectURL(el)
            })
        }

    }, [])

    const handleAudioEnd = () => {
        if (blobURL[current + 1]) {
            setCurrent(current => current + 1)
            audio.current?.load()
        }
        else
            setCurrent(current => current + 1)
    }

    return (
        <div className="flex justify-around w-full px-8 flex-wrap gap-4">
            <audio className="-z-50 absolute -top-96" ref={audio} controls autoPlay src={blobURL[current]} onEnded={handleAudioEnd}>
            </audio>
            <div className="flex flex-col max-w-[450px] w-full">
                <video src="" ref={selfVideoRef} className=" bg-main-purple w-full h-full rounded-2xl  max-h-[340px]"></video>
                <p className={`mt-4 py-2 px-6 rounded-2xl max-w-[200px] ${selfSpeaking === true ? 'bg-[#362360] text-white' : 'bg-main-purple'}`}> {selfServerLang} {selfSpeaking === true ? "- Speaking..." : ""} </p>
                <p className="mt-4">
                    You : {lastTranscription}
                </p>
            </div>
            <div className="flex flex-col max-w-[450px] w-full">
                <video src="" ref={receiverVideoRef} className="bg-main-purple w-full h-full rounded-2xl max-h-[340px]"></video>
                <p className={`mt-4 py-2 px-6 rounded-2xl max-w-[200px] ${receiverSpeaking === true ? 'bg-[#362360] text-white' : 'bg-main-purple'}`}> {receiverServerLang} {receiverSpeaking === true ? "- Speaking..." : ""} </p>
                <p className="mt-4">
                    Other : {lastTranslation}
                </p>
            </div>
        </div>
    )
}

export default VideoReceiver;