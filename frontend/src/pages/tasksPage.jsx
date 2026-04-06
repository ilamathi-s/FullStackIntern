import { useState } from "react";
import TaskList from "../components/taskList";

export default function TasksPage() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });

  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-primary mb-6">
        Task List
      </h1>

      <TaskList refresh={refresh} setStats={setStats} />

    </div>
  );
}