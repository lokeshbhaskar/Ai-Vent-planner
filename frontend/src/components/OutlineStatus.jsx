import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://ai-vent-planner.onrender.com",
  {
    transports: ["websocket"],  
    withCredentials: true,
  }
);

export default function OnlineStatus() {
  const [onlineCount, setOnlineCount] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log("Connecting to socket...");
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
      setConnected(true);
    });

    socket.on("onlineUsers", (count) => {
      console.log("👥 Users Online:", count);
      setOnlineCount(count);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setConnected(false);
    });

    return () => {
      socket.off("onlineUsers");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="fixed left-40 md:left-60 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center space-x-2">
      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
      <span>{connected ? ` ${onlineCount} online ` : "Connecting..."}</span>
    </div>
  );
}
