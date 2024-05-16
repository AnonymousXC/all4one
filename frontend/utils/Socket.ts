import { io } from "socket.io-client";

const BASE_URL = process.env.NODE_ENV == 'development' ? "http://localhost:8081" : "https://all4one-production.up.railway.app"
// const BASE_URL = "https://all4one-production.up.railway.app"

const socket = io(BASE_URL)

export default socket;