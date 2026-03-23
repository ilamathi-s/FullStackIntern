import { useState } from "react";
import { createTask } from "../services/api";

export default function TaskForm({ refresh }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(task);
    setTask({ title: "", description: "", priority: "medium" });
    refresh();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-6">

      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Add Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Enter task title..."
          className="w-full p-2 border rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={task.title}
          onChange={(e) =>
            setTask({ ...task, title: e.target.value })
          }
        />
        <textarea
          placeholder="Enter task description..."
          className="w-full p-2 border rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={task.description}
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
        />
        <select
          className="w-full p-2 border rounded text-gray-800"
          value={task.priority}
          onChange={(e) =>
            setTask({ ...task, priority: e.target.value })
          }
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Add Task
        </button>
      </form>
    </div>
  );
}