// controllers/taskController.js

import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, assignedTo } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

    let task;

    if (req.user.role === "admin") {
      task = new Task({
        title,
        description,
        priority,
        assignedTo,
      });
    } else {
      task = new Task({
        title,
        description,
        priority,
        assignedTo: req.user.id,
      });
    }

    await task.save();
    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      // ✅ Admin → all tasks
      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 });
    } else {
      // ✅ User → only their tasks
      tasks = await Task.find({ assignedTo: req.user.id })
        .sort({ createdAt: -1 });
    }

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ✅ Only owner OR admin can update
    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ✅ Only owner OR admin
    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};