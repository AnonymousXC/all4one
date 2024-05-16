import { Socket } from "socket.io";
import saveRecording from "../helpers/audioBlobToFile"
import openai from "../openAI";
import { io } from "..";
import { emailLanguageMap } from "./LanguageSetter";
const path = require('path')
const fs = require('fs')

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


/**
 * 
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
 */

export default sentAudio;