import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import loginRoutes from "./routes/loginRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", registerRoutes);
app.use("/api/auth", loginRoutes);
app.get("/", (req, res) => {
  res.send("Server is running...");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});