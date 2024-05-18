import { Socket } from "socket.io";
import saveRecording from "../helpers/audioBlobToFile"
import openai from "../openAI";
import { io } from "..";
import { emailLanguageMap } from "./LanguageSetter";
import { toFile } from "openai";
import getTimeNow from "../helpers/getTime";

const sentAudio = async function(this: Socket, data: any) {

    const socket = this;

    try {
      var users = io.sockets.adapter.rooms.get(data.callID)
      var endUserID = ""
      users?.forEach(val => {
        if(val !== socket.id)
          endUserID = val
      })
      // @ts-expect-error
      let endUserLanguage = emailLanguageMap[endUserID]
      if(endUserLanguage === undefined || !endUserLanguage)
        endUserLanguage = "ENGLISH"

      console.log("Received audio", endUserLanguage)

      const translation = await openai.audio.transcriptions.create({
        file: await toFile(data.audio, socket.id + getTimeNow() + ".wav"),
        model: 'whisper-1',
        response_format: 'json'
      })


      console.log("Transcription successeded : " + translation.text)

      // Translate text to any language
      
      console.log("GPT 3.5 Translation begins")
      const getTranslationToLang = await openai.chat.completions.create(
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content : `Translate ${translation.text} to ${endUserLanguage}`
            }
          ]
        }
      )

      const translatedText = getTranslationToLang.choices[0].message.content
      console.log("GPT 3.5 Translation ended")

      const voice = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'nova',
        input: translatedText || ''
      })


      console.log("TTS completed")


      const buffer = Buffer.from(await voice.arrayBuffer())
      let filePathOutput = await saveRecording(buffer, socket.id + "output", "outputs")


      console.log(filePathOutput)
      console.log("Saved output")

      
      socket.broadcast.to(data.callID).emit("receive-translation", { "filePath": filePathOutput.fileName, "text": translatedText })
    }
    catch (err) {
      socket.emit("error processing audio", { text : "Error in processing."})
      console.log(err)
    }
}


/**
 * 
const sentAudio = async function(this: Socket, data: any) {

    const socket = this;

    var users = io.sockets.adapter.rooms.get(data.callID)
    var endUserID = ""
    users?.forEach(val => {
      if(val !== socket.id)
        endUserID = val
    })
    // @ts-expect-error
    var endUserLanguage = emailLanguageMap[endUserID]

    console.log("Received audio")

    // const savedAudio = await saveRecording(data.audio, socket.id, "audio")

    // testing
    // if (data.audio === "test")
    //   savedAudio.folderPath = path.join(__dirname, "../", "audio", "test audio.mp3")
    // console.log(savedAudio)


    const translation = await openai.audio.translations.create({
      file: await toFile(data.audio, socket.id + getTimeNow() + ".wav"),
      model: 'whisper-1',
    })


    console.log("Translation successeded : " + translation.text)

    // Translate text to any language
    
    console.log("GPT 3.5 Translation begins")
    const getTranslationToLang = await openai.chat.completions.create(
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content : `Translate ${translation.text} to ${endUserLanguage}`
          }
        ]
      }
    )

    const translatedText = getTranslationToLang.choices[0].message.content
    console.log("GPT 3.5 Translation ended")

    const voice = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'nova',
      input: translatedText || ''
    })


    console.log("TTS completed")


    const buffer = Buffer.from(await voice.arrayBuffer())
    let filePathOutput = await saveRecording(buffer, socket.id + "output", "outputs")


    console.log(filePathOutput)
    console.log("Saved output")

    
    socket.broadcast.to(data.callID).emit("receive-translation", { "filePath": filePathOutput.fileName, "text": translatedText })

}
}
 */

export default sentAudio;