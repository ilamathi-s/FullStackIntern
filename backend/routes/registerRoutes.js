import express from "express";
import { registerUser } from "../controllers/registerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",authMiddleware, registerUser);

export default router;