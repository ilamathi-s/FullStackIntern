import { useState } from "react";
import { updateTask, deleteTask } from "../services/api";

export default function TaskCard({ task, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  const handleUpdate = async () => {
    await updateTask(task._id, updatedTask);
    setIsEditing(false);
    refresh();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">

  {isEditing ? (
    <div className="space-y-3">

      <input
  className="w-full px-3 py-2 border rounded-lg 
  text-gray-900 placeholder-gray-400
  focus:ring-2 focus:ring-blue-400 outline-none"
  placeholder="Edit title..."
  value={updatedTask.title}
  onChange={(e) =>
    setUpdatedTask({ ...updatedTask, title: e.target.value })
  }
/>

<textarea
  className="w-full px-3 py-2 border rounded-lg 
  text-gray-900 placeholder-gray-400
  focus:ring-2 focus:ring-blue-400 outline-none"
  placeholder="Edit description..."
  value={updatedTask.description}
  onChange={(e) =>
    setUpdatedTask({
      ...updatedTask,
      description: e.target.value,
    })
  }
/>

<select
  className="w-full px-3 py-2 border rounded-lg 
  text-gray-900
  focus:ring-2 focus:ring-blue-400 outline-none"
  value={updatedTask.priority}
  onChange={(e) =>
    setUpdatedTask({
      ...updatedTask,
      priority: e.target.value,
    })
  }
>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleUpdate}
          className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Save
        </button>

        <button
          onClick={() => setIsEditing(false)}
          className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">
          {task.title}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium
          ${task.priority === "high" && "bg-red-100 text-red-600"}
          ${task.priority === "medium" && "bg-yellow-100 text-yellow-600"}
          ${task.priority === "low" && "bg-green-100 text-green-600"}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
        {task.description}
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="flex-1 py-2 bg-green-500 rounded-lg hover:bg-green-200 transition"
        >
          Edit
        </button>

        <button
          onClick={async () => {
            await deleteTask(task._id);
            refresh();
          }}
          className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-300 transition"
        >
          Delete
        </button>
      </div>
    </>
  )}
</div>
  );
}