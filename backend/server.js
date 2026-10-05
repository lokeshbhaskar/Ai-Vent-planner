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

const PORT = process.env.PORT || 8000;
const app = express();

const allowedOrigins = [
  "https://ai-vent-planner-1.onrender.com",
  "https://ai-vent-planner.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for development
    },
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

// Start server and connect to MongoDB
const startServer = async () => {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      await loadInitialData();
    } catch (err) {
      console.error("Initial data loading error:", err.message || err);
    }
  } else {
    console.warn("⚠️ Running server without MongoDB connection. Please verify your MONGO_URI in .env");
  }

  server.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
};

startServer();

