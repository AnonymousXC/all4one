import Peer from "peerjs";
import { createContext } from "react";


const PeerContext = createContext<Peer | undefined>(undefined)

export default PeerContext