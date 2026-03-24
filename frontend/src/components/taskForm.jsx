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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-6">

      <h2 className="text-xl font-semibold text-gray-800 mb-1">
  Create Task
</h2>
<p className="text-sm text-gray-500 mb-4">
  Add and manage your daily work
</p>

      <form onSubmit={handleSubmit} className="space-y-3">
       <input
  type="text"
  placeholder="Enter task title..."
  className="w-full px-3 py-2 border rounded-lg 
  text-gray-900 placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-blue-400"
  value={task.title}
  onChange={(e) =>
    setTask({ ...task, title: e.target.value })
  }
/>

<textarea
  placeholder="Enter task description..."
  className="w-full px-3 py-2 border rounded-lg 
  text-gray-900 placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-blue-400"
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

       <button className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition font-medium">
  Add Task
</button>
      </form>
    </div>
  );
}