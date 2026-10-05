import { Server } from "socket.io";

let onlineUsers = 0;

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    onlineUsers++;
    // console.log(`User connected | Total online: ${onlineUsers}`);
    // Send online user count to all clients
    io.emit("onlineUsers", onlineUsers);

    socket.on("disconnect", () => {
      onlineUsers--;
      console.log(`User disconnected | Total online: ${onlineUsers}`);
      io.emit("onlineUsers", onlineUsers);
    });
  });
}
