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
    createdBy: req.user.id,
    assignedTo: assignedTo || null,
  });
} else {
  task = new Task({
    title,
    description,
    priority,
    createdBy: req.user.id,
    assignedTo: null, 
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
     
      tasks = await Task.find({ assignedTo: { $ne: null } })
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 });

    } else {
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

    if (
      req.user.role !== "admin" &&
      (!task.assignedTo || task.assignedTo.toString() !== req.user.id)
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

    
    if (req.user.role === "admin") {
      await task.deleteOne();
      return res.json({ message: "Task deleted" });
    }

    if (task.assignedTo && task.assignedTo.toString() === req.user.id) {
      return res.status(403).json({ message: "Cannot delete assigned task" });
    }

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getMyCreatedTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      createdBy: req.user.id,
      assignedTo: null,
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};