import express from "express";
import { getUserStats } from "../controllers/statsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";
import { getAllUsers } from "../controllers/adminController.js";
const router = express.Router();

router.get(
  "/users-stats",
  authMiddleware,
  checkRole("admin"),
  getUserStats
);
router.get("/users", authMiddleware, checkRole("admin"), getAllUsers);

export default router;