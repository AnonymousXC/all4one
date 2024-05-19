import socket from "@/utils/Socket";
import { useEffect, useState } from "react";


function StatsForNerds() {

    const [data, setData] = useState<any>()

    useEffect(() => {

        socket.on("processing-time", (data : any) => {
            setData(data)
            console.log(data)
        })

        return () => {
            socket.off("processing-time", (data) => {

            })
        }

    }, [])

    return (
        <div className="absolute top-0 left-0">
            Last request/audio processing time : {data?.time2[0]} seconds
        </div>
    )
}

export default StatsForNerds;