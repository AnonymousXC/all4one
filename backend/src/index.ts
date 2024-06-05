require('dotenv').config()
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_KEY)

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
import updateCredits from "./database/updateCredits";

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



const endpointSecret = process.env.NODE_ENV === 'development' ? process.env.STRIPE_ENDPOINT_SECRET_DEV : process.env.STRIPE_ENDPOINT_SECRET_PRODUCTION


app.post('/payment', express.raw({ type: 'application/json' }), async (request, response) => {

  try {

    // if (!request.metadata.id || !request.metadata.email) {
    //   console.log(request)
    //   response.status(400).send(`No database id or email was found in request.`)
    //   return;
    // }

    console.log(request)

    const sig = request.headers['stripe-signature'];
    let event;

    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);

    if (event.type === 'checkout.session.completed') {
      // @ts-expect-error
      const status = await updateCredits(request.metadata.id, request.metadata.email, request.data.object.amount_total)

      console.log(status)

      if (status.error !== null) {
        response.status(400).send(`Their was an error in updating the credits. ${status.error.details}`)
        return;
      }
      response.send(`Credited in ${event.metadata.email}`);
    }

  }
  catch (err: any) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    console.log(err)
    return;
  }

});


server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

export { io }