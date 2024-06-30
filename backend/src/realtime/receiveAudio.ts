import { Socket } from "socket.io";
import openai from "../openAI";
import { toFile } from "openai";
import getTimeNow from "../helpers/getTime";
import translate from "../GCP";

type Props = {
    audio: Buffer,
    languageFrom: string,
    languageTo: string
}

const ReceiveRealtime = async function (this: Socket, data: Props) {
    const socket = this;
    socket.emit('realtime-status', { text: 'Processing...' })
    try {
        const transcription = await openai.audio.transcriptions.create({
            file: await toFile(data.audio, socket.id + getTimeNow() + ".wav"),
            model: 'whisper-1',
            response_format: 'json',
            language: data.languageFrom
        })

        const [translation] = await await translate.translate(transcription.text, data.languageTo)

        const voice = await openai.audio.speech.create({
            model: 'tts-1',
            voice: 'nova',
            input: translation || ''
        })

        const buffer = Buffer.from(await voice.arrayBuffer())
        socket.emit("realtime-output", { buffer })
        socket.emit('realtime-status', { text: 'Ideal' })
    }

    catch (err) {
        console.log(err)
        socket.emit('realtime-status', { text: 'Error occured.' })
    }
}

export default ReceiveRealtime;