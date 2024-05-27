'use client'
import NavBar2 from "@/components/global/navbar/Navigationbar2";
import PeerContext from "@/contexts/PeerContext";
import Peer from "peerjs";
import { useEffect, useState } from "react";


function VideoCall() {

    const [ peer, setPeer ] = useState<Peer>()

    useEffect(() => {
        const peerLoc = new Peer()
        setPeer(peerLoc)
        console.log(peerLoc)
    }, [])

    return (
        <PeerContext.Provider value={peer}>
            <NavBar2 />
            <PeerContext.Consumer>
                {
                    peer => (
                        <p> Peer id:  {peer?.id} </p>
                    )
                }
            </PeerContext.Consumer>
        </PeerContext.Provider>
    )
}

export default VideoCall;