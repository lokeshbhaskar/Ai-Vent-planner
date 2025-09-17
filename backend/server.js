import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import dotenv from "dotenv";
import { loadInitialData } from "./controllers/dataController.js";
import initSocket from "./socket.js";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 5000;
connectDB();
const app = express();
loadInitialData();
app.use(
  cors({
    origin: ["https://ai-vent-planner-1.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
// app.use('/api/data',dataRoutes)
app.use("/api/ai", aiRoutes);

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
