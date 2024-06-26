import { Dispatch, SetStateAction } from "react";
export {}

declare global {
    interface Window {
        sidebar: boolean,
        setSidebar: Dispatch<SetStateAction<boolean>>,
        selfStream: MediaStream,
        setCamera: Dispatch<SetStateAction<boolean>>,
        setVideoCallConnection: Dispatch<SetStateAction<boolean>>
    }
}
