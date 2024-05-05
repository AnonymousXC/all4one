import { io } from "socket.io-client";

const BASE_URL = process.env.NODE_ENV == 'development' ? "http://localhost:8081" : "urls"

const socket = io(BASE_URL)

export default socket;