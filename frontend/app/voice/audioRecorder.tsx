'use client'
import socket from "@/utils/Socket";
import { Microphone, MicrophoneOff } from "@styled-icons/boxicons-regular";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MediaStreamRecorder, RecordRTCPromisesHandler } from "recordrtc";


function AudioRecorder({ callID }: { callID: string | string[] }) {

    const [recordingStatus, setRecordingStatus] = useState<'active' | 'inactive'>('inactive')
    const [recorder, setRecorder] = useState<RecordRTCPromisesHandler>()
    const [interval, setIntervalVar] = useState<any>()
    const router = useRouter()

    useEffect(() => {

        (async () => {
            let stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            let recorderLoc = new RecordRTCPromisesHandler(stream, {
                type: 'audio',
                mimeType: 'audio/wav',
                recorderType: MediaStreamRecorder,
                disableLogs: true,
                timeSlice: 15200,
                ondataavailable: async (_blob) => {
                    const buffer = Buffer.from(await _blob.arrayBuffer())
                    socket.emit("send-audio", {
                        audio: buffer,
                        callID: callID
                    })
                }

            });
            setRecorder(recorderLoc)
        })()

    }, [])

    function handleStart() {
        setRecordingStatus('active')
        recorder?.startRecording()
        const recInterval = setInterval(async () => {
            recorder?.stopRecording()
            recorder?.startRecording()
        }, 15000)

        setIntervalVar(recInterval)
    }

    function handleStop() {
        recorder?.stopRecording()
        clearInterval(interval)
        setRecordingStatus('inactive')
    }

    function endCall() {
        socket.emit('leave-voice-call', { id: callID })
        router.push('/user/dashboard')
    }



    return (
        <div className="flex gap-5 items-center">
            <button className={`flex justify-center items-center w-[60px] h-[60px] rounded-full transition-all ${recordingStatus === 'active' ? "bg-slate-950" : "bg-red-600"}`}
                onClick={() => {
                    if (recordingStatus === "inactive") {
                        handleStart()
                        socket.emit("speaking-start", { callID: "voice/" + callID })
                    }
                    else {
                        handleStop()
                        socket.emit("speaking-end", { callID: "voice/" + callID })
                    }
                }}>
                {
                    recordingStatus === 'active' ? <Microphone size={"30px"} color="white" /> : <MicrophoneOff size={"30px"} color="white" />
                }
            </button>
            <button className={`bg-[#222222] hover:bg-black text-white px-6 max-h-10 h-[80px] rounded-2xl`}
                onClick={endCall}>
                End call
            </button>
        </div>

    );
};


export default AudioRecorder;