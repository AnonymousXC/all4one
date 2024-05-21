'use client'
import socket from "@/utils/Socket";
import { useEffect, useState } from "react";
import { RecordRTCPromisesHandler, MediaStreamRecorder } from "recordrtc"


function AudioRecorder({ callID }: { callID: string | string[] }) {

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
                timeSlice: 4200,
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
        }, 4000)
        
        setIntervalVar(recInterval)
    }

    function handleStop() {
        recorder?.stopRecording()
        clearInterval(interval)
        setRecordingStatus('inactive')
    }
    

    return (
        <>
            <div className="flex absolute bottom-24 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button className={`default-btn w-max ${recordingStatus === 'inactive' ? 'bg-blue-700' : 'bg-pink-700 hover:bg-pink-700'}`}
                    onClick={handleStart}>
                    Start
                </button>
                <button className={`default-btn w-max ${recordingStatus === 'inactive' ? 'bg-blue-700' : 'bg-pink-700 hover:bg-pink-700'}`}
                    onClick={handleStop}>
                    Stop
                </button>
            </div>

        </>
    );
};


export default AudioRecorder;