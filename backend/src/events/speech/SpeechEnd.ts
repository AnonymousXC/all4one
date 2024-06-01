import { Socket } from "socket.io";
import { io } from "../..";

const SpeechEnd = function (this: Socket, data : { callID: string }) {
    const socket : Socket = this;
    io.to(data.callID).emit("speech-end", { id: socket.id })
}

export default SpeechEnd;