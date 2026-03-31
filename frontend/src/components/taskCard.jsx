import { useState } from "react";
import { updateTask, deleteTask } from "../services/api";
import { FaCheckCircle } from "react-icons/fa";

export default function TaskCard({ task, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  });
  const handleUpdate = async () => {
    await updateTask(task._id, updatedTask);
    setIsEditing(false);
    refresh();
  };
  const handleComplete = async () => {
    await updateTask(task._id, { status: "completed" });
    refresh();
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">

      {isEditing ? (
        <div className="space-y-3">
          <input
            className="w-full px-3 py-2 border border-border rounded-lg 
            text-text placeholder-muted
            focus:ring-2 focus:ring-primary outline-none"
            placeholder="Edit title..."
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
          />
          <textarea
            className="w-full px-3 py-2 border border-border rounded-lg 
            text-text placeholder-muted
            focus:ring-2 focus:ring-primary outline-none"
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
            className="w-full px-3 py-2 border border-border rounded-lg 
            text-text bg-card
            focus:ring-2 focus:ring-primary outline-none"
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
<select
  className="w-full px-3 py-2 border border-border rounded-lg 
  text-text bg-card
  focus:ring-2 focus:ring-primary outline-none"
  value={updatedTask.status}
  onChange={(e) =>
    setUpdatedTask({
      ...updatedTask,
      status: e.target.value,
    })
  }
>
  <option value="pending">Pending</option>
  <option value="in-progress">In Progress</option>
  <option value="completed">Completed</option>
</select>
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleUpdate}
              className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 py-2 bg-border text-text rounded-lg hover:opacity-80 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">

            <h3
              className={`text-lg font-semibold ${
                task.status === "completed"
                  ? "line-through text-muted"
                  : "text-text"
              }`}
            >
              {task.title}
            </h3>

            <div className="flex gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium
                ${task.priority === "high" && "bg-red-100 text-red-600"}
                ${task.priority === "medium" && "bg-yellow-100 text-yellow-600"}
                ${task.priority === "low" && "bg-green-100 text-green-600"}`}
              >
                {task.priority}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium
                ${task.status === "completed" && "bg-green-100 text-green-600"}
                ${task.status === "in-progress" && "bg-blue-100 text-blue-600"}
                ${task.status === "pending" && "bg-gray-100 text-gray-600"}`}
              >
                {task.status}
              </span>

            </div>
          </div>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              task.status === "completed"
                ? "line-through text-muted"
                : "text-muted"
            }`}
          >
            {task.description}
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleComplete}
              disabled={task.status === "completed"}
              className={`flex-1 py-2 text-white rounded-lg flex items-center justify-center gap-2 transition
              ${
                task.status === "completed"
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              <FaCheckCircle />
              Done
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
            >
              Edit
            </button>
            <button
              onClick={async () => {
                await deleteTask(task._id);
                refresh();
              }}
              className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>

          </div>
        </>
      )}
    </div>
  );
}