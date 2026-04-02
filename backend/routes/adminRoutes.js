import express from "express";
import { getUserStats } from "../controllers/statsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";
const router = express.Router();
router.get("/users-stats", authMiddleware, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, getUserStats);

router.get(
  "/users-stats",
  authMiddleware,
  checkRole("admin"),
  getUserStats
);

export default router;