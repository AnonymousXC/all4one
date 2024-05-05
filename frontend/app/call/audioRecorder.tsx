import socket from "@/utils/Socket";
import Image from "next/image";
import { useState, useRef } from "react";


function AudioRecorder({ callID } : { callID: string | string[] }) {

    const [permission, setPermission] = useState(false);
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
        if (permission === false) {
            getMicrophonePermission()
            return;
        }


        if (permission === true && recordingStatus === 'inactive') {
            startRecording()
        }
        else if (permission === true)
            stopRecording()

    }

    const startRecording = async () => {
        console.log("Recording")
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
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            // @ts-ignore
            setAudio(audioUrl);
            setAudioChunks([]);
            socket.emit("send-audio", {
                audio: audioUrl,
                callID: callID
            })
        };
        

    };

    return (
        <>
            <button className="absolute bottom-24 left-1/2 default-btn w-max" onClick={handleRecord}>
                <Image src={'/mic.svg'} width={50} height={50} alt="microphone" />
            </button>
            <audio src={audio} controls></audio>
        </>
    );
};


export default AudioRecorder;