'use client'
import WhisperContext from "@/contexts/WhisperContext";
import socket from "@/utils/Socket";
import { useRouter } from "next/navigation";
import { useContext } from "react";


function AudioRecorder({ callID }: { callID: string | string[] }) {

    const router = useRouter()
    const {
        recording,
        transcript,
        startRecording,
        stopRecording, } = useContext(WhisperContext)

    function endCall() {
        socket.emit('leave-voice-call', { id: callID })
        router.push('/user/dashboard')
    }


    return (
        <div className="flex gap-5 items-center">
            <button className={`flex justify-center items-center w-[60px] h-[60px] ${recording === false ? 'bg-[#222222] hover:bg-black' : 'bg-slate-600 hover:bg-slate-900'} rounded-full`}
                onClick={() => {
                    console.log(transcript.text)
                    if (recording === false)
                        startRecording()
                    else
                        stopRecording()
                }}>
                <img src="/icons/mic.svg" height={30} width={30} className="invert" />
            </button>
            <button className={`bg-[#222222] hover:bg-black text-white px-6 max-h-10 h-[80px] rounded-2xl`}
                onClick={endCall}>
                End call
            </button>
        </div>

    );
};


export default AudioRecorder;