import User from "../models/User.js";
import Task from "../models/Task.js";

export const getUserStats = async (req, res) => {
  try {
    const users = await User.find();

    const result = await Promise.all(
      users.map(async (user) => {
        const tasks = await Task.find({ assignedTo: user._id });

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          total: tasks.length,
          completed: tasks.filter(t => t.status === "completed").length,
          pending: tasks.filter(t => t.status === "pending").length,
          inProgress: tasks.filter(t => t.status === "in-progress").length,
        };
      })
    );

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
