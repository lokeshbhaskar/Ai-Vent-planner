import express from 'express'
import { getCurrentUser, loginController, registerController } from '../controllers/authControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/getcurrentuser", protect , getCurrentUser)

export default router;