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
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition">

      {isEditing ? (
        <div className="space-y-3">

          <input
            className="w-full p-2 border rounded text-gray-800 placeholder-gray-400"
            placeholder="Edit title..."
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
          />

          <textarea
            className="w-full p-2 border rounded text-gray-800 placeholder-gray-400"
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
            className="w-full p-2 border rounded text-gray-800"
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

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-800">
            {task.title}
          </h3>

          <p className="text-gray-600">
            {task.description}
          </p>

          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-blue-500">
              {task.priority}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-yellow-400 rounded"
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  await deleteTask(task._id);
                  refresh();
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}