import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("a user is connected");
  // const connectedUsers = Object.keys(io.engine.clientsCount).length;
  const connectedUsers = io.engine.clientsCount;
  console.log(`number of connected users: ${connectedUsers}`);

  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const connectedUsers = Object.keys(io.sockets.sockets).length;
    console.log(`number of connected users: ${connectedUsers}`);

    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log("message:", data.message);
      socket.to(sendUserSocket).emit("msg-receive", {
        from: data.from,
        message: data.message,
      });
    }
  });
});
