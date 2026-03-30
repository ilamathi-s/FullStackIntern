import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.tasks || [];
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}

      <div className="grid lg:grid-cols-3 gap-6">
        <div>
          <TaskForm refresh={fetchTasks} />
        </div>

        <div className="lg:col-span-2">
          <TaskList tasks={tasks} refresh={fetchTasks} />
        </div>
      </div>
    </div>
  );
}