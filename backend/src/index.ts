const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors')

// types imports
import { Express, Request, Response } from "express";
import { Server as ServerType, Socket } from "socket.io";

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

    socket.on('send-audio', (data: any) => {
      console.log(data)
    })
    
});


server.listen(8081, () => {
  console.log('server running at http://localhost:8081');
});