import { Socket } from "socket.io"

const LeaveCall = function(this : Socket, { id } : any) {
    const socket = this
    socket.leave(`voice/${id}`)
}

export default LeaveCall;