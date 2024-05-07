import { io } from "socket.io-client";

// const BASE_URL = process.env.NODE_ENV == 'development' ? "http://localhost:8081" : "http://81.17.100.31:8081"
const BASE_URL = "http://81.17.100.31:8081"

const socket = io(BASE_URL)

export default socket;