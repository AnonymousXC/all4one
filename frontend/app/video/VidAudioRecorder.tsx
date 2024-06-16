'use client'
import socket from "@/utils/Socket";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Camera, Microphone } from "@/utils/iconsExports"
import { toast } from "react-toastify";
import { MediaStreamRecorder, RecordRTCPromisesHandler } from "recordrtc";
import { CameraOff, MicrophoneOff } from "@styled-icons/boxicons-regular";

type Props = {
    callID: string | string[],
    connectionFunc: () => void,
    receiverID: string | null
}

function VideoAudioRecorder({ callID, connectionFunc, receiverID }: Props) {

    const [recordingStatus, setRecordingStatus] = useState<'active' | 'inactive'>('inactive')
    const [recorder, setRecorder] = useState<RecordRTCPromisesHandler>()
    const [interval, setIntervalVar] = useState<any>()
    const [isConnectionMade, setConnection] = useState(false)
    const [isReceiver, setIsReceiver] = useState(true)
    const [camera, setCamera] = useState(false)
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

    const onRoomLeave = () => {
        setConnection(false)
        setIsReceiver(false)
    }


    useEffect(() => {
        window.setCamera = setCamera
        window.setVideoCallConnection = setConnection
        socket.once('new-user-joined', ({ userID, lang }: { userID: string, lang: any }) => {
            if (Object.keys(lang).length > 1)
                setIsReceiver(true)
            else
                setIsReceiver(false)
        })
        socket.on('room-left', onRoomLeave)

        return () => {
            socket.off('room-left', onRoomLeave)
        }

    }, [])


    return (
        <div className="flex gap-5 items-center">
            <button className={`flex justify-center items-center w-[60px] h-[60px] rounded-full transition-all ${recordingStatus === 'active' ? "bg-slate-950" : "bg-red-600"}`}
                onClick={() => {
                    if (recordingStatus === "inactive") {
                        handleStart()
                        socket.emit("speaking-start", { callID: "video/" + callID })
                    }
                    else {
                        handleStop()
                        socket.emit("speaking-end", { callID: "video/" + callID })
                    }
                }}>
                {
                    recordingStatus === 'active' ? <Microphone size={"30px"} color="white" /> : <MicrophoneOff size={"30px"} color="white" />
                }
            </button>
            <button className={`bg-[#222222] hover:bg-black text-white px-6 max-h-10 h-[80px] rounded-2xl`}
                onClick={() => {
                    if (isConnectionMade === false && isReceiver === false) {
                        if (receiverID === null || !receiverID) {
                            toast.error("No user found to call")
                            return
                        }
                        connectionFunc()
                    }
                    else
                        endCall()
                }}>
                {
                    isReceiver === false && isConnectionMade === false ? "Connect" : "End call"
                }
            </button>
            <button className={`flex justify-center items-center w-[60px] h-[60px] bg-black rounded-full transition-all ${camera === true ? "bg-slate-950" : "bg-red-600"}`}
            onClick={() => {
                if(window.selfStream)
                {
                    window.selfStream.getVideoTracks()[0].enabled = !window.selfStream.getVideoTracks()[0].enabled
                    setCamera(window.selfStream.getVideoTracks()[0].enabled)
                }
            }}>
                {
                    camera === true ? <Camera size={"30px"} color="white" /> : <CameraOff size={"30px"} color="white" />
                }
            </button>
        </div>

    );
};


export default VideoAudioRecorder;