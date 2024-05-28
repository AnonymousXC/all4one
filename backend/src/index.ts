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

});


io.of('/').adapter.on('leave-room', (room: string, id: string) => {
  io.to(room).emit('room-left')
})


io.of('/').adapter.on('join-room', (room: string, id: string) => {
  if(room.includes('voice'))
    io.to(room).emit('new-user-joined', { callID : room.replace('voice/', ''), id })
  if(room.includes('video'))
  {
    // @ts-expect-error
    const lang = IdLanguageMap[id]
    io.to(room).emit('new-video-user', { userID: id, lang })

  }
})


server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

export { io }