import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import TaskCard from "./taskCard";

export default function TaskList({ refresh, setStats }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);

      // ✅ ROBUST STATS (handles case issues safely)
      const total = res.data.length;

      const completed = res.data.filter(
        t => t.status?.toLowerCase() === "completed"
      ).length;

      const pending = res.data.filter(
        t => t.status?.toLowerCase() === "pending"
      ).length;

      const inProgress = res.data.filter(
        t => t.status?.toLowerCase() === "in-progress"
      ).length;

      setStats({ total, completed, pending, inProgress });

    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchTasks();
    }
  }, [refresh]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} refresh={fetchTasks} />
        ))
      ) : (
        <p className="text-muted">No tasks found</p>
      )}
    </div>
  );
}