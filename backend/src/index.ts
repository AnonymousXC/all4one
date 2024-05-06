const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors')
const fs = require('fs')

// types imports
import { Express, Request, Response } from "express";
import { Server as ServerType, Socket } from "socket.io";
import saveRecording from "./helpers/audioBlobToFile";
import openai from "./openAI";

// Variables
const app: Express = express();
const server = createServer(app);
const io: ServerType = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send("<h1> Backend for ALL4ONE  </h1>")
});


io.on('connection', (socket: Socket) => {

    socket.on('join-call', (data : { id : string }) => {
      socket.join(data.id)
    })

    socket.on('send-audio', async (data: any) => {
      // const filePath = await saveRecording(data.audio, socket.id)
      const translation = await openai.audio.translations.create({
        file: fs.createReadStream('./audio/test audio.mp3'),
        model: 'whisper-1'
      })

      // const voice = await openai.audio.speech.create({
      //   model: 'tts-1',
      //   voice: 'nova',
      //   input: translation.text
      // })

      // const blob = await voice.blob()
      // console.log(blob)

      console.log(translation)
      
      socket.broadcast.to(data.callID).emit("receive-translation",translation)

    })
    
});




server.listen(8081, () => {
  console.log('server running at http://localhost:8081');
});