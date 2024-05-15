import { Socket } from "socket.io";

const JoinCall = function (this: Socket, data : any) {
    const socket : Socket = this;
    socket.join(data.id)
}

export default JoinCall;