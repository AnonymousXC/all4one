const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors')

const path = require('path')

// types imports
import { Express, Request, Response } from "express";
import { Server as ServerType, Socket } from "socket.io";
import JoinCall from "./events/JoinCall";
import sentAudio from "./events/AudioReceive";

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

  socket.on('send-audio',sentAudio)

});


app.get('/audio/outputs/:file', function (req, res) {
  const file = path.join(__dirname, "../", "outputs", req.params.file);
  res.download(file);
});


app.get('/user/audio/:file', function (req, res) {
  const file = path.join(__dirname, "../", "audio", req.params.file);
  res.download(file);
});


server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});