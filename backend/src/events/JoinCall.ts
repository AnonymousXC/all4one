import { Socket } from "socket.io";

const JoinCall = function (this: Socket, data : { id : string, languageTo : string }) {
    const socket : Socket = this;
    socket.join(data.id)
    socket.broadcast.to(data.id).emit('set-receiver-language', { receiverLanguage : [data.languageTo] })
    socket.to(data.id).emit('new-user-joined', { language: data.languageTo, callID: data.id })
    console.log(socket.id + " joined " + data.id)
}

export default JoinCall;