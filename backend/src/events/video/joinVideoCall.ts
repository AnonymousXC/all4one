import { Socket } from "socket.io";


const joinVideoCall = function(this : Socket, { id } : { id : string }) {
    const socket = this
    socket.join(`video/${id}`)
}

export default joinVideoCall;