'use client'
import TranscriptionsContext from "@/contexts/TrancriptionsContext";
import WhisperContext from "@/contexts/WhisperContext";
import socket from "@/utils/Socket";
import languages from "@/utils/languageMap";
import { useContext, useEffect, useRef, useState } from "react";

type Props = {
    selfVideoRef: any,
    receiverVideoRef: any,
}

function VideoReceiver({ selfVideoRef, receiverVideoRef }: Props) {

    let [filePath, setFilePath] = useState<Array<string>>([])
    const [current, setCurrent] = useState(0)
    const audio = useRef<HTMLAudioElement>(null)
    const [ selfServerLang, setSelfServerLang ] = useState<string>("Waiting for user...")
    const [ receiverServerLang, setReceiverServerLang ] = useState<string>("Waiting for user...")
    const [ lastTranslation, setLastTranslation ] = useState("")


    const {
        transcript,
    } = useContext(WhisperContext)
    const { translations, setTranslations } = useContext(TranscriptionsContext)

    const recMsg = (file: any) => {
        const blob = new Blob([file.buffer], { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        if(audio.current)
            {
                audio.current.src = url
                audio.current.play()
            }
        // setTranslations((translations: any) => [...translations, { text: file.text, self: false }])
        setLastTranslation(file.text)
        // setFilePath(filePath => [...filePath, url])
        // if (audio.current?.paused === true)
            // audio.current?.load()
    }

    const newVideoUserJoin = ({ userID, lang }: { userID: string, lang : any }) => {
        Object.keys(lang).forEach((el) => {
            if(el === socket.id)
                // @ts-expect-error
                setSelfServerLang(languages[lang[el]])
            else
                // @ts-expect-error
                setReceiverServerLang(languages[lang[el]])
        })
    }

    useEffect(() => {

        socket.on("receive-translation", recMsg)

        socket.on('new-video-user', newVideoUserJoin)

        return () => {
            socket.off("receive-translation", recMsg)
            socket.off('new-video-user', newVideoUserJoin)
            filePath.forEach((el: string, idx: number) => {
                URL.revokeObjectURL(el)
            })
        }

    }, [])

    // const handleAudioEnd = () => {
    //     if (filePath[current + 1]) {
    //         setCurrent(current => current + 1)
    //         audio.current?.load()
    //     }
    // }

    return (
        <div className="flex justify-around w-full px-8 flex-wrap gap-4">
            <audio className="-z-50 absolute -top-96" ref={audio} controls autoPlay src={filePath[current]}>
            </audio>
            <div className="flex flex-col max-w-[450px] w-full">
                <video src="" ref={selfVideoRef} className=" bg-main-purple w-full h-full rounded-2xl  max-h-[340px]"></video>
                <p className="mt-4 bg-main-purple py-2 px-6 rounded-2xl max-w-[200px]"> {selfServerLang} </p>
                <p className="mt-4">
                    You : { transcript.text }
                </p>
            </div>
            <div className="flex flex-col max-w-[450px] w-full">
                <video src="" ref={receiverVideoRef} className="bg-main-purple w-full h-full rounded-2xl max-h-[340px]"></video>
                <p className="mt-4 bg-[#362360] py-2 px-6 rounded-2xl max-w-[200px] text-white"> {receiverServerLang} </p>
                <p className="mt-4">
                    Other : {lastTranslation}
                </p>
            </div>
        </div>
    )
}

export default VideoReceiver;