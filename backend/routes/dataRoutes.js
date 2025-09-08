import express from "express";
import { loadInitialData } from "../controllers/dataController.js";

const router = express.Router();

// POST: /api/data/load
router.post("/load", loadInitialData);

export default router;
