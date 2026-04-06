import { useState, useEffect } from "react";
import { updateTask, deleteTask } from "../services/api";
import API from "../services/api";
import { FaCheckCircle } from "react-icons/fa";

export default function TaskCard({ task, refresh, isPersonal = false, isAdminDashboard = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [users, setUsers] = useState([]);

  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    assignedTo: task.assignedTo?._id || "",
  });

  useEffect(() => {
    if (user?.role === "admin" && !isPersonal) {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = { ...updatedTask };

      if (payload.assignedTo === "") {
        delete payload.assignedTo;
      }

      await updateTask(task._id, payload);

      setIsEditing(false);
      if (refresh) refresh();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Update failed");
    }
  };

  const handleComplete = async () => {
    try {
      await updateTask(task._id, { status: "completed" });
      if (refresh) refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const isOwner =
    task.createdBy === user?.id ||
    task.createdBy?._id === user?.id;

  const isAssignedTask = !!task.assignedTo;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">

      {isEditing ? (
        <div className="space-y-3">

          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
            className="w-full px-3 py-2 border border-border rounded-lg 
            text-text bg-card
            focus:ring-2 focus:ring-primary outline-none"
          />

          <textarea
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
            className="w-full px-3 py-2 border border-border rounded-lg 
            text-text bg-card
            focus:ring-2 focus:ring-primary outline-none"
          />

          {user?.role === "admin" && !isPersonal && (
            <select
              className="w-full px-3 py-2 border border-border rounded-lg 
              text-text bg-card
              focus:ring-2 focus:ring-primary outline-none"
              value={updatedTask.assignedTo}
              onChange={(e) =>
                setUpdatedTask({
                  ...updatedTask,
                  assignedTo: e.target.value,
                })
              }
            >
              <option value="">Assign to user</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          )}

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
              className="flex-1 py-2 bg-primary text-white rounded-lg"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 py-2 bg-border text-text rounded-lg"
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
              <span className={`text-xs px-2 py-1 rounded-full font-medium
  ${
    task.priority === "high"
      ? "bg-red-100 text-red-600"
      : task.priority === "medium"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-green-100 text-green-600"
  }
`}>
  {task.priority}
</span>

              <span className={`text-xs px-2 py-1 rounded-full font-medium
  ${
    task.status === "completed"
      ? "bg-green-100 text-green-600"
      : task.status === "in-progress"
      ? "bg-blue-100 text-blue-600"
      : "bg-gray-200 text-gray-600"
  }
`}>
  {task.status}
</span>
            </div>
          </div>

          <p className="mt-2 text-sm text-muted">
            {task.description}
          </p>

          <div className="flex gap-2 mt-4">

          {!isAdminDashboard && (
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
          )}

            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 py-2 bg-primary text-white rounded-lg"
            >
              Edit
            </button>

            {(isOwner && !isAssignedTask) || user?.role === "admin" ? (
              <button
                onClick={async () => {
                  await deleteTask(task._id);
                  if (refresh) refresh();
                }}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            ) : null}

          </div>
        </>
      )}
    </div>
  );
}