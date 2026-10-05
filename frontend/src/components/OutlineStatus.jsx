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
    socket.on("connect", () => setConnected(true));
    socket.on("onlineUsers", (count) => setOnlineCount(count));
    socket.on("disconnect", () => setConnected(false));

    return () => {
      socket.off("onlineUsers");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  if (!connected) return null;

  return (
    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      {onlineCount} online
    </div>
  );
}
