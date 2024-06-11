import { Socket } from "socket.io"

const LeaveCall = function(this : Socket, { id } : { id: string }) {
    const socket = this
    socket.leave(`voice/${id}`)
}

export default LeaveCall;