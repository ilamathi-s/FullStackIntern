import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import TaskCard from "./taskCard";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} refresh={fetchTasks} />
      ))}
    </div>
  );
}