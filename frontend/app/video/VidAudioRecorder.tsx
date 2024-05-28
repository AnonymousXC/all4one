'use client'
import TranscriptionsContext from "@/contexts/TrancriptionsContext";
import WhisperContext from "@/contexts/WhisperContext";
import socket from "@/utils/Socket";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Camera } from "@/utils/iconsExports"
import { toast } from "react-toastify";

type Props = {
    callID: string | string[],
    connectionFunc: () => void,
    receiverID: string | null
}

function VideoAudioRecorder({ callID , connectionFunc, receiverID} : Props) {

    const router = useRouter()
    const {
        recording,
        transcript,
        startRecording,
        stopRecording, } = useContext(WhisperContext)
    const { setTranslations } = useContext(TranscriptionsContext)
    const [ isConnectionMade, setConnection ] = useState(false)

    function endCall() {
        socket.emit('leave-voice-call', { id: callID })
        router.push('/user/dashboard')
    }


    return (
        <div className="flex gap-5 items-center">
            <button className={`flex justify-center items-center w-[60px] h-[60px] ${recording === false ? 'bg-[#222222] hover:bg-black' : 'bg-slate-600 hover:bg-slate-900'} rounded-full`}
                onClick={() => {
                    if (recording === false)
                        startRecording()
                    else
                    {
                        stopRecording()
                        socket.emit("send-audio", { "text" : transcript.text, callID })
                        setTranslations((translations : any) => [...translations, {text : transcript.text, self: true }])
                    }
                }}>
                <img src="/icons/mic.svg" height={30} width={30} className="invert" />
            </button>
            <button className={`bg-[#222222] hover:bg-black text-white px-6 max-h-10 h-[80px] rounded-2xl`}
                onClick={() => {
                    if(isConnectionMade === false)
                        {
                            if(receiverID === null || !receiverID) {
                                toast.error("No user found to call")
                                return
                            }
                            connectionFunc()
                            setConnection(true)
                        }
                    else
                        endCall()
                }}>
                {
                    isConnectionMade === false ? "Connect" : "End call"
                }
            </button>
            <button className={`flex justify-center items-center w-[60px] h-[60px] bg-black rounded-full`}>
                <Camera size={"30px"} color="white" />
            </button>
        </div>

    );
};


export default VideoAudioRecorder;