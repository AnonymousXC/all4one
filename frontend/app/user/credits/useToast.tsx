'use client'
import { useEffect } from "react";
import { toast } from "react-toastify";


function ToastStatus({ message } : { message : string }) {
    useEffect(() => {
        if(message.length > 1)
        toast.error(message)
    }, [message])
    return (
        <>
        </>
    )
}

export default ToastStatus;