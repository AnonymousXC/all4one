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
                timeSlice: 5100,
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
        }, 5000)
        
        setIntervalVar(recInterval)
    }

    function handleStop() {
        recorder?.stopRecording()
        clearInterval(interval)
        setRecordingStatus('inactive')
    }
    

    return (
        <>
            <div className="flex absolute bottom-24 left-1/2">
                <button className={`default-btn w-max ${recordingStatus === 'inactive' ? 'bg-blue-700' : 'bg-pink-700 hover:bg-pink-700'}`}
                    onClick={handleStart}>
                    {/* <Image src={'/mic.svg'} width={50} height={50} alt="microphone" /> */}
                    Start
                </button>
                <button className={`default-btn w-max ${recordingStatus === 'inactive' ? 'bg-blue-700' : 'bg-pink-700 hover:bg-pink-700'}`}
                    onClick={handleStop}>
                    {/* <Image src={'/mic.svg'} width={50} height={50} alt="microphone" /> */}
                    Stop
                </button>
                <button className={`default-btn w-max ${recordingStatus === 'inactive' ? 'bg-blue-700' : 'bg-pink-700 hover:bg-pink-700'}`}
                    onClick={() => { }}>
                    Test
                </button>
            </div>

        </>
    );
};

/**
 *     const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef<any>(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [audioChunks, setAudioChunks] = useState<any>([]);
    const [audio, setAudio] = useState("");

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err: any) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const handleRecord = () => {
        getMicrophonePermission()

        if (permission === true && recordingStatus === 'inactive') {
            startRecording()
        }
        else if (permission === true)
            stopRecording()
    }

    const startRecording = async () => {
        setRecordingStatus("recording");
        // @ts-ignore
        const media = new MediaRecorder(stream);
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localAudioChunks: any = [];
        mediaRecorder.current.ondataavailable = (event: any) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        console.log("Stopped recording")
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        stream?.getAudioTracks()[0].stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(audioBlob)
            // @ts-ignore
            setAudio(audioUrl);
            setAudioChunks([]);
            socket.emit("send-audio", {
                audio: audioBlob,
                callID: callID
            })
        };
    };
        const handleRecord = () => {
        socket.emit("send-audio", {
            audio: "test",
            callID: callID
        })
    }

 */

export default AudioRecorder;