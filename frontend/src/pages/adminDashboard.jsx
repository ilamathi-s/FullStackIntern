import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";
import API from "../services/api";

import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

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

  const triggerRefresh = () => setRefresh(prev => !prev);

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

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted text-sm mt-1">
            Monitor tasks and user performance
          </p>
        </div>

        <div className="flex items-center gap-4">

  <button
    onClick={() => navigate("/create-task")}
    className="bg-primary text-white px-4 py-2 rounded-xl"
  >
    + Create Task
  </button>

  <div className="bg-card border border-border px-4 py-2 rounded-xl shadow-sm">
    <p className="text-sm text-muted">Logged in as</p>
    <p className="font-semibold text-text">{user?.name}</p>
  </div>

  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white"
  >
    Logout
  </button>

</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Tasks", value: stats.total },
          { label: "Completed", value: stats.completed, color: "text-green-600" },
          { label: "Pending", value: stats.pending, color: "text-yellow-600" },
          { label: "In Progress", value: stats.inProgress, color: "text-blue-600" },
        ].map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-muted">{item.label}</p>
            <h2 className={`text-2xl font-bold ${item.color || "text-text"}`}>
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Task Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Completed", value: stats.completed },
                  { name: "Pending", value: stats.pending },
                  { name: "In Progress", value: stats.inProgress },
                ]}
                dataKey="value"
                outerRadius={80}
                label
              >
                <Cell fill="#22c55e" />
                <Cell fill="#eab308" />
                <Cell fill="#3b82f6" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h2 className="font-semibold mb-4">User Performance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="font-semibold mb-4">User Analytics</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-muted">
              <tr>
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Total</th>
                <th>Completed</th>
                <th>Pending</th>
                <th>In Progress</th>
              </tr>
            </thead>

            <tbody>
              {userStats.map((u) => (
                <tr key={u._id} className="border-t text-center hover:bg-hover">
                  <td className="p-3 text-left text-primary">{u.name}</td>
                  <td className="text-primary">{u.email}</td>
                  <td className="text-black">{u.total}</td>
                  <td className="text-green-600">{u.completed}</td>
                  <td className="text-yellow-600">{u.pending}</td>
                  <td className="text-blue-600">{u.inProgress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border p-4 rounded-2xl">
          <TaskForm refresh={triggerRefresh} />
        </div>

        <div className="lg:col-span-2 bg-card border border-border p-4 rounded-2xl">
          <TaskList refresh={refresh} setStats={setStats} />
        </div>
      </div>

    </div>
  );
}