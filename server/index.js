import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import { Server as SocketIOServer } from "socket.io";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads/images", express.static("uploads/images"));
app.use("/uploads/recordings", express.static("uploads/recordings"));

app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT}`);
});

const io = new SocketIOServer(server, {
  cors: {
    origin:
      "https://whatsapp-clone-eight-lovat.vercel.app/" ||
      "http://localhost:3000",
  },
});

global.onlineUsers = new Map();
// console.log("outside connection", onlineUsers);

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("sendMsg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    // console.log("onlineUsers inside sendMsg event", onlineUsers);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("receiveMsg", {
        from: data.from,
        message: data.message,
      });
    }
  });
});

export default app;
