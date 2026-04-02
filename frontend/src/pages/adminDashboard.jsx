import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";
import API from "../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });

  const [userStats, setUserStats] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(prev => !prev);
  };

  // ✅ Fetch user analytics
  const fetchUserStats = async () => {
    try {
     const res = await API.get("/admin/users-stats");
      setUserStats(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, [refresh]);

  // ✅ Auth check
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.role !== "admin") {
      navigate("/login/admin");
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login/admin");
  };

  return (
    <div className="min-h-screen bg-bg p-6">

  {/* HEADER */}
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-3xl font-bold text-primary">
        Admin Dashboard
      </h1>
      <p className="text-muted text-sm mt-1">
        Manage tasks and monitor users efficiently
      </p>
    </div>

    <div className="flex items-center gap-4">
      {/* User Info */}
      <div className="bg-card border border-border px-4 py-2 rounded-xl shadow-sm">
        <p className="text-sm text-muted">Logged in as</p>
        <p className="font-semibold text-text">{user?.name}</p>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white transition"
      >
        Logout
      </button>
    </div>
  </div>

  {/* GLOBAL STATS */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-muted mb-1">Total Tasks</p>
      <h2 className="text-2xl font-bold text-text">{stats.total}</h2>
    </div>

    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-green-500 mb-1">Completed</p>
      <h2 className="text-2xl font-bold text-green-600">{stats.completed}</h2>
    </div>

    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-yellow-500 mb-1">Pending</p>
      <h2 className="text-2xl font-bold text-yellow-600">{stats.pending}</h2>
    </div>

    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-blue-500 mb-1">In Progress</p>
      <h2 className="text-2xl font-bold text-blue-600">{stats.inProgress}</h2>
    </div>

  </div>

  {/* USER ANALYTICS */}
  <div className="bg-card border border-border rounded-2xl shadow-sm p-6 mb-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-text">
        User Analytics
      </h2>
      <span className="text-sm text-muted">
        Total Users: {userStats.length}
      </span>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-muted">
            <th className="p-3 rounded-l-xl">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3 text-center">Total</th>
            <th className="p-3 text-center">Completed</th>
            <th className="p-3 text-center">Pending</th>
            <th className="p-3 text-center rounded-r-xl">In Progress</th>
          </tr>
        </thead>

        <tbody>
          {userStats.map((u) => (
            <tr
              key={u._id}
              className="border-t hover:bg-hover transition"
            >
              <td className="p-3 font-medium text-text">{u.name}</td>
              <td className="p-3 text-muted">{u.email}</td>
              <td className="p-3 text-center">{u.total}</td>
              <td className="p-3 text-center text-green-600 font-medium">
                {u.completed}
              </td>
              <td className="p-3 text-center text-yellow-600 font-medium">
                {u.pending}
              </td>
              <td className="p-3 text-center text-blue-600 font-medium">
                {u.inProgress}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* MAIN LAYOUT */}
  <div className="grid lg:grid-cols-3 gap-6">

    {/* Task Creation */}
    <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
      <TaskForm refresh={triggerRefresh} />
    </div>

    {/* Task List */}
    <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-4 shadow-sm">
      <TaskList refresh={refresh} setStats={setStats} />
    </div>

  </div>

</div>
  );
}