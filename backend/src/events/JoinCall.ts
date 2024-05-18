import { Socket } from "socket.io";

const JoinCall = function (this: Socket, data : { id : string, languageTo : string }) {
    const socket : Socket = this;
    socket.join(data.id)
    socket.broadcast.to(data.id).emit('set-receiver-language', { receiverLanguage : [data.languageTo] })
    console.log(socket.id + " joined " + data.id)
}

export default JoinCall;