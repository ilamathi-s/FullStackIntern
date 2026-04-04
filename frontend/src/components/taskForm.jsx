import { useEffect, useState } from "react";
import { createTask } from "../services/api";
import API from "../services/api";

export default function TaskForm({ refresh, isPersonal = false }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    assignedTo: "",
  });

  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title || !task.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      let payload = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
      };

      if (!isPersonal && user?.role === "admin") {
        payload.assignedTo = task.assignedTo || null;
      }

      await createTask(payload);

      setTask({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
        assignedTo: "",
      });

      if (refresh) refresh();

    } catch (err) {
      console.error(err.response?.data || err);
      alert("Task creation failed");
    }
  };

  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border sticky top-6">

      <h2 className="text-xl font-semibold text-text mb-1">
        Create Task
      </h2>

      <p className="text-sm text-muted mb-4">
        Add and manage your daily work
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="text"
          placeholder="Enter task title..."
          className="w-full px-3 py-2 border border-border rounded-lg 
          text-text placeholder-muted
          focus:outline-none focus:ring-2 focus:ring-primary"
          value={task.title}
          onChange={(e) =>
            setTask({ ...task, title: e.target.value })
          }
        />

        <textarea
          placeholder="Enter task description..."
          className="w-full px-3 py-2 border border-border rounded-lg 
          text-text placeholder-muted
          focus:outline-none focus:ring-2 focus:ring-primary"
          value={task.description}
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
        />

        <select
          className="w-full p-2 border border-border rounded text-text bg-card
          focus:outline-none focus:ring-2 focus:ring-primary"
          value={task.priority}
          onChange={(e) =>
            setTask({ ...task, priority: e.target.value })
          }
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select
          className="w-full p-2 border border-border rounded text-text bg-card
          focus:outline-none focus:ring-2 focus:ring-primary"
          value={task.status}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value })
          }
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {user?.role === "admin" && !isPersonal && (
          <select
            className="w-full p-2 border border-border rounded text-text bg-card
            focus:outline-none focus:ring-2 focus:ring-primary"
            value={task.assignedTo}
            onChange={(e) =>
              setTask({ ...task, assignedTo: e.target.value })
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

        <button className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary-hover transition font-medium">
          Add Task
        </button>

      </form>
    </div>
  );
}