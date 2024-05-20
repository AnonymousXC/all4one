import { Socket } from "socket.io"

const LeaveCall = function(this : Socket, data : any) {
    const socket = this
    socket.leave(`voice/${data.id}`)
}

export default LeaveCall;