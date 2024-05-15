import { Socket } from "socket.io";
import saveRecording from "../helpers/audioBlobToFile"
import openai from "../openAI";
const path = require('path')
const fs = require('fs')

const sentAudio = async function(this: Socket, data: any) {

    const socket = this;

    console.log("Received audio")

    const savedAudio = await saveRecording(data.audio, socket.id, "audio")

    // testing
    if (data.audio === "test")
      savedAudio.folderPath = path.join(__dirname, "../", "audio", "test audio.mp3")
    console.log(savedAudio)


    const translation = await openai.audio.translations.create({
      file: fs.createReadStream(savedAudio.folderPath),
      model: 'whisper-1'
    })


    console.log("Translation successeded")


    const voice = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'nova',
      input: translation.text
    })


    console.log("TTS completed")


    const buffer = Buffer.from(await voice.arrayBuffer())
    let filePathOutput = await saveRecording(buffer, socket.id + "output", "outputs")


    console.log(filePathOutput)
    console.log("Saved output")

    
    socket.broadcast.to(data.callID).emit("receive-translation", { "filePath": filePathOutput.fileName, "text": translation.text })

}

export default sentAudio;