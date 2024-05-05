'use client'
import socket from "@/utils/Socket";
import { useParams } from "next/navigation";
import { useEffect } from "react";


function CallPage() {

    const id = useParams()['id']
    
    useEffect(() => {
        socket.emit('join-call', { id : id })
    }, [])

    return (
        <div>
            call {id}
        </div>
    )
}

export default CallPage;