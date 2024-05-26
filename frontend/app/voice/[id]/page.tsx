'use client'
import socket from "@/utils/Socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AudioRecorder from "../audioRecorder";
import AudioReceiver from "../audioReceiver";
import StatsForNerds from "@/components/Stats";
import LanguageModel from "@/components/global/Language/LanguageModal";
import NavBar2 from "@/components/global/navbar/Navigationbar2";
import WhisperContext from "@/contexts/WhisperContext";
import useWhisper from "@kkaczynski/use-whisper";


function CallPage() {

    const id = useParams()['id']
    const [date, setDate] = useState(new Date())
    const whisper = useWhisper(
        {
            apiKey: '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',
            mode: 'transcriptions',
            removeSilence: true,
            streaming: true,
            timeSlice: 1000
        }
    )

    useEffect(() => {
        const languageTo = localStorage.getItem('self-language')
        socket.emit('join-call', { id: id, languageTo })

        var timer = setInterval(() => setDate(new Date()), 1000)

        return () => {
            clearInterval(timer)
        }

    }, [])

    return (
        <>
            <WhisperContext.Provider value={whisper}>
                <NavBar2 />
                <section className="flex justify-center items-center flex-col w-full md:h-[calc(100vh_-_80px)] bg-[#FBFCFF]">
                    <div className="flex flex-col justify-between w-full h-full p-8 max-w-screen-xl gap-20 md:gap-2 max-h-[700px]">

                        <div className="w-full md:mx-6">
                            <div className="bg-white border border-[rgba(0, 0, 0, 0.1)] rounded-2xl px-6 py-6 flex items-center flex-col gap-8">
                                <div className="flex w-full justify-between">
                                    <h3 className="text-xl font-bold">Good evening!</h3>
                                    {/* <p> {date.toLocaleTimeString()} </p> */}
                                </div>
                                <AudioReceiver />
                                <AudioRecorder callID={id} />
                            </div>
                        </div>
                        <StatsForNerds />
                        <LanguageModel />

                    </div>
                </section>
            </WhisperContext.Provider>
        </>
    )
}

export default CallPage;