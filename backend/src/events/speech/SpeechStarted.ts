import { Socket } from "socket.io";
import { io } from "../..";

const SpeechStarted = function (this: Socket, data : { callID: string }) {
    const socket : Socket = this;
    io.to(data.callID).emit("speech-start", { id: socket.id })
}

export default SpeechStarted;