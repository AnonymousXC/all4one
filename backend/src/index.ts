const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors')
const path = require('path')
require('dotenv').config()

// types imports
import { Express, Request, Response } from "express";
import { Server as ServerType, Socket } from "socket.io";
import JoinCall from "./events/JoinCall";
import sentAudio from "./events/AudioReceive";
import LanguageSelect, { IdLanguageMap } from "./events/LanguageSetter";
import onDisconnect from "./events/Disconnect";
import LeaveCall from "./events/LeaveCall";
import joinVideoCall from "./events/video/joinVideoCall";
import SpeechStarted from "./events/speech/SpeechStarted";
import SpeechEnd from "./events/speech/SpeechEnd";

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

  socket.on('join-call', JoinCall)

  socket.on('send-audio', sentAudio)

  socket.on('set-langauge', LanguageSelect)

  socket.on('disconnect', onDisconnect)

  socket.on('leave-voice-call', LeaveCall)

  socket.on('join-video', joinVideoCall)

  socket.on('speaking-start', SpeechStarted)

  socket.on('speaking-end', SpeechEnd)
});


io.of('/').adapter.on('leave-room', (room: string, id: string) => {
  io.to(room).emit('room-left')
})


io.of('/').adapter.on('join-room', (room: string, id: string) => {
  var users = io.sockets.adapter.rooms.get(room)
  let lang: any = {}
  users?.forEach((el) => {
    // @ts-expect-error
    const userLang = IdLanguageMap[el]
    lang[el] = userLang
  })
  if (room.includes('voice') || room.includes('video'))
    io.to(room).emit('new-user-joined', { callID: room.replace('voice/', ''), id, lang })
})


app.post('/payment', express.json({ type: 'application/json' }), (request, response) => {

  const event = request.body;

  if (event.type === 'payment_intent.succeeded') {
    console.log(`Handled event type ${event.type}`);
  }
  else if (event.type === 'payment_method.attached') {
    console.log(`Handled event type ${event.type}`);

  }
  else
    console.log(`Unhandled event type ${event.type}`);
  {

  }

  response.json({ received: true });
});


server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

export { io }