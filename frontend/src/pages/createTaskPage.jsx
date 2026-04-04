import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/taskForm";
import TaskCard from "../components/taskCard";
import { getMyCreatedTasks } from "../services/api";

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const fetchMyTasks = async () => {
    try {
      const res = await getMyCreatedTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  return (
    <div className="min-h-screen bg-bg p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">
          My Workspace
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="bg-card border border-border p-4 rounded-2xl shadow-sm">
          <TaskForm refresh={fetchMyTasks} isPersonal={true} />
        </div>

        <div className="lg:col-span-2 bg-card border border-border p-4 rounded-2xl shadow-sm">
          <h2 className="font-semibold mb-4">My Created Tasks</h2>

          {tasks.length === 0 ? (
            <p className="text-muted">No tasks created yet</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard
  key={task._id}
  task={task}
  refresh={fetchMyTasks}
  isPersonal={true}  
/>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}