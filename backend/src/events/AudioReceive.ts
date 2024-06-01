import { Socket } from "socket.io";
import openai from "../openAI";
import { io } from "..";
import { IdLanguageMap } from "./LanguageSetter";
import translate from "../GCP";
import { toFile } from "openai";
import getTimeNow from "../helpers/getTime";

interface FrontendData {
  audio: Buffer,
  callID: string
}

const sentAudio = async function(this: Socket, data: FrontendData) {

    const socket = this;
    const hrtTime = process.hrtime()
    data.callID = 'voice/' + data.callID

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

      // @ts-expect-error
      let selfLanguage = IdLanguageMap[socket.id]

      console.log(`Received audio. Self language : ${selfLanguage}. Language To : ${endUserLanguage}`)

      const transcription = await openai.audio.transcriptions.create({
        file: await toFile(data.audio, socket.id + getTimeNow() + ".wav"),
        model: 'whisper-1',
        response_format: 'json',
        language: selfLanguage,
      })

      io.to(data.callID).emit("receive-transcription", { "text": transcription.text, "id" : socket.id })

      console.log("Transcription successeded : " + transcription.text)

      
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
      
      socket.to(data.callID).emit("receive-translation", { "buffer" : buffer, "text": translation, "id" : socket.id })
      io.to(data.callID).emit("processing-time", { time1: hrtTime, time2: process.hrtime(hrtTime) })
    }
    catch (err) {
      socket.emit("error processing audio", { text : "Error in processing."})
      console.log(err)
    }
}


export default sentAudio;