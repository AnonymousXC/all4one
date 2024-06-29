'use client'
import socket from "@/utils/Socket";
import { Microphone, MicrophoneOff } from "@styled-icons/boxicons-regular";
import { useEffect, useState } from "react";
import { MediaStreamRecorder, RecordRTCPromisesHandler } from "recordrtc";

type Props = {
    languageFrom: string,
    languageTo: string,
}

function AudioRecorder(props: Props) {

    const [recordingStatus, setRecordingStatus] = useState<'active' | 'inactive'>('inactive')
    const [recorder, setRecorder] = useState<RecordRTCPromisesHandler>()
    const [interval, setIntervalVar] = useState<any>()

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
                    socket.emit("realtime-transcription", {
                        audio: buffer,
                        ...props
                    })
                }

            });
            setRecorder(recorderLoc)
        })()

    }, [props])

    function handleStart() {
        console.log(props)
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


    return (
        <div className="flex gap-5 items-center justify-center">
            <button className={`flex justify-center items-center w-[60px] h-[60px] rounded-full transition-all ${recordingStatus === 'active' ? "bg-slate-950" : "bg-red-600"}`}
                onClick={() => {
                    if (recordingStatus === "inactive") {
                        handleStart()
                    }
                    else {
                        handleStop()
                    }
                }}>
                {
                    recordingStatus === 'active' ? <Microphone size={"30px"} color="white" /> : <MicrophoneOff size={"30px"} color="white" />
                }
            </button>
        </div>

    );
};


export default AudioRecorder;