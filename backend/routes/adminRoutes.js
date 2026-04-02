import express from "express";
import { getUserStats } from "../controllers/statsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Admin-only route
router.get("/users-stats", authMiddleware, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, getUserStats);

export default router;