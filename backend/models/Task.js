import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: {
    type: String,
    enum: ["low", "medium", "high"]
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);