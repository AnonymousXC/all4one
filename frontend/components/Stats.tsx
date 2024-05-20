import socket from "@/utils/Socket";
import { useEffect } from "react";
import { toast } from "react-toastify";


function StatsForNerds() {

    
    const newUserJoin = (data : any) => {
        if(data.id === socket.id)
            toast.success(`You joined the call ${data.callID}`)
        else
            toast.success(`New user joined the call ${data.callID}.`)
    }

    const onUserLeave = (data : any) => {
        toast.info(`User left.`)
    }

    const onProcessingTime = (data : any) => {
        toast.success(`Last request/audio processing time : ${data?.time2[0]} seconds`)
    }
    

    useEffect(() => {

        socket.on("processing-time", onProcessingTime)

        socket.on('new-user-joined', newUserJoin)
        socket.on('room-left', onUserLeave)

        return () => {
            socket.off('new-user-joined', newUserJoin)
            socket.off('room-left', onUserLeave)
            socket.off("processing-time", onProcessingTime)
        }

    }, [])

    return (
        <></>
    )
}

export default StatsForNerds;