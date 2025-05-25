import express from "express"
import auth_router from "./Routes/auth.js"
import http from "http"; // <- Add this
import { Server } from "socket.io"; // <- Add this
import {run} from "./config.js"
import cors from "cors"
import message from "./Routes/message.js"
const app = express()
app.use(express.json())
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*", // You can restrict this later
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send-message", (msgData) => {
    console.log("Message received:", msgData);

    // Send message to all connected clients (you can customize to rooms later)
    io.emit("receive-message", msgData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});



async function start(){
    await run();
    server.listen(process.env.PORT || 5001, ()=>{
        console.log(`Server running on ${process.env.PORT || 5001}`)
    });
}
start();


app.get("/",(req,res)=>{
    console.log("Hello there!")
})


app.use("/auth",auth_router)
app.use("/message",message)

