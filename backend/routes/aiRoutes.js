import express from "express";
import { generateEventPlan } from "../controllers/aiControllers.js";
import { checkSubscription } from "../middlewares/checkSubscription.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/ai/plan
router.post("/generate-plan", protect , checkSubscription, generateEventPlan);

export default router;
