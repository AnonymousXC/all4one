'use client'
import { createContext } from "react";

type UseWhisperReturn = {
    recording: boolean;
    speaking: boolean;
    transcribing: boolean;
    transcript: UseWhisperTranscript;
    pauseRecording: () => Promise<void>;
    startRecording: () => Promise<void>;
    stopRecording: () => Promise<void>;
};

type UseWhisperTranscript = {
    blob?: Blob;
    text?: string;
};

const WhisperContext = createContext<UseWhisperReturn | null | any>(null)

export default WhisperContext;