import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });

  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(prev => !prev);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.role !== "user") {
      navigate("/login/user");
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login/user");
  };

  return (
    <div className="min-h-screen bg-bg p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">
          My Tasks Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>

      <p className="text-primary">Welcome, {user?.name}</p>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">

  {/* Total */}
  <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-muted mb-1">Total Tasks</p>
    <h2 className="text-2xl font-bold text-text">{stats.total}</h2>
  </div>

  {/* Completed */}
  <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-green-500 mb-1">Completed</p>
    <h2 className="text-2xl font-bold text-green-600">{stats.completed}</h2>
  </div>

  {/* Pending */}
  <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-yellow-500 mb-1">Pending</p>
    <h2 className="text-2xl font-bold text-yellow-600">{stats.pending}</h2>
  </div>

  {/* In Progress */}
  <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-blue-500 mb-1">In Progress</p>
    <h2 className="text-2xl font-bold text-blue-600">{stats.inProgress}</h2>
  </div>

</div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Create Task */}
        <TaskForm refresh={triggerRefresh} />

        {/* Task List */}
        <div className="lg:col-span-2">
          <TaskList refresh={refresh} setStats={setStats} />
        </div>

      </div>
    </div>
  );
}