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

  return (
    <div className="min-h-screen bg-bg text-text">


      <div className="p-6">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-muted text-sm">
              Monitor tasks and user performance
            </p>
          </div>

        
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Tasks", value: stats.total },
            { label: "Completed", value: stats.completed, color: "text-green-600" },
            { label: "Pending", value: stats.pending, color: "text-yellow-600" },
            { label: "In Progress", value: stats.inProgress, color: "text-blue-600" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border p-5 rounded-2xl">
              <p className="text-sm text-muted">{item.label}</p>
              <h2 className={`text-2xl font-bold ${item.color || ""}`}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          <div className="bg-card border border-border p-5 rounded-2xl">
            <h2 className="mb-4 font-semibold">Task Distribution</h2>
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

          <div className="bg-card border border-border p-5 rounded-2xl">
            <h2 className="mb-4 font-semibold">User Performance</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={userStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
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
    </div>
  );
}