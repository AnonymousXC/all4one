import { Socket } from "socket.io";
import saveRecording from "../helpers/audioBlobToFile"
import openai from "../openAI";
import { io } from "..";
import { IdLanguageMap } from "./LanguageSetter";
import { toFile } from "openai";
import getTimeNow from "../helpers/getTime";
import translate from "../GCP";

const sentAudio = async function(this: Socket, data: any) {

    const socket = this;
    const hrtTime = process.hrtime()

    try {
      var users = io.sockets.adapter.rooms.get(data.callID)
      var endUserID = ""
      users?.forEach(val => {
        if(val !== socket.id)
          endUserID = val
      })
      // @ts-expect-error
      let endUserLanguage = IdLanguageMap[endUserID]
      if(endUserLanguage === undefined || !endUserLanguage)
        endUserLanguage = "en"

      console.log("Received audio", endUserLanguage)

      const transcription = await openai.audio.transcriptions.create({
        file: await toFile(data.audio, socket.id + getTimeNow() + ".wav"),
        model: 'whisper-1',
        response_format: 'json'
      })


      console.log("Transcription successeded : " + transcription.text)

      // Translate text to any language
      
      console.log("GCP Translation begins")
      const [translation] = await translate.translate(transcription.text, endUserLanguage);
      console.log("GCP Translation ended : " + translation)

      const voice = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'nova',
        input: translation || ''
      })


      console.log("TTS completed")


      const buffer = Buffer.from(await voice.arrayBuffer())
      let filePathOutput = await saveRecording(buffer, socket.id + "output", "outputs")


      console.log(filePathOutput)
      console.log("Saved output")

      
      socket.broadcast.to(data.callID).emit("receive-translation", { "filePath": filePathOutput.fileName, "text": translation })
      io.to(data.callID).emit("processing-time", { time1: hrtTime, time2: process.hrtime(hrtTime) })
    }
    catch (err) {
      socket.emit("error processing audio", { text : "Error in processing."})
      console.log(err)
    }
}


export default sentAudio;