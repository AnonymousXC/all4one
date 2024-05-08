const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors')
const fs = require('fs')
const path = require('path')

// types imports
import { Express, Request, Response } from "express";
import { Server as ServerType, Socket } from "socket.io";
import saveRecording from "./helpers/audioBlobToFile";
import openai from "./openAI";

// Variables
const app: Express = express();
const server = createServer(app);
const port = process.env.PORT || 8081;
const io: ServerType = new Server(server, {
  cors: {
    origin: (origin: string, callback: any) => {
      if (["http://localhost:3000", "https://all4one.vercel.app"].includes(origin)) {
        callback(null, origin);
      }
    }
  }
});

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send("<h1> Backend for ALL4ONE  </h1>")
});


io.on('connection', (socket: Socket) => {

  socket.on('join-call', (data: { id: string }) => {
    socket.join(data.id)
  })

  socket.on('send-audio', async (data: any) => {

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

    console.log("Saved output")

    socket.broadcast.to(data.callID).emit("receive-translation", { "filePath": [filePathOutput.fileName] })

  })

});


app.get('/audio/outputs/:file', function (req, res) {
  const file = path.join(__dirname, "../", "outputs", req.params.file);
  res.download(file);
});


server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});