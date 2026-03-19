import express from "express";
import { loginUser } from "../controllers/loginController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authMiddleware, loginUser);

export default router;