import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import TaskCard from "./taskCard";

export default function TaskList({ refresh, setStats }) {
  const [tasks, setTasks] = useState([]);

  const statusOrder = {
    "pending": 1,
    "in-progress": 2,
    "completed": 3,
  };

  const priorityOrder = {
    "high": 1,
    "medium": 2,
    "low": 3,
  };

  const fetchTasks = async () => {
    try {
      const res = await getTasks();

      let sortedTasks = res.data.sort((a, b) => {
        const statusDiff =
          statusOrder[a.status?.toLowerCase()] -
          statusOrder[b.status?.toLowerCase()];

        if (statusDiff !== 0) return statusDiff;

        return (
          priorityOrder[a.priority?.toLowerCase()] -
          priorityOrder[b.priority?.toLowerCase()]
        );
      });

      setTasks(sortedTasks);

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

      setStats?.({ total, completed, pending, inProgress });

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

  const user = JSON.parse(localStorage.getItem("user"));

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <h2 className="text-xl font-semibold text-gray-600">
          No tasks yet 🚀
        </h2>
        <p className="text-gray-400 mt-2">
          Start by creating your first task
        </p>
        <a
          href="/create-task"
          className="mt-4 px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Create Task
        </a>
      </div>
    );
  }

  const grouped = {
    pending: tasks.filter(t => t.status === "pending"),
    "in-progress": tasks.filter(t => t.status === "in-progress"),
    completed: tasks.filter(t => t.status === "completed"),
  };

  return (
    <div className="space-y-8">
      
      {Object.entries(grouped).map(([status, list]) => (
        <div key={status}>
          
          <h2 className="text-lg font-bold mb-3 capitalize text-gray-700">
            {status.replace("-", " ")}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                refresh={fetchTasks}
                isAdminDashboard={user?.role === "admin"}
              />
            ))}
          </div>

        </div>
      ))}

    </div>
  );
}