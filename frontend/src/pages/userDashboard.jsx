import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "user") {
      navigate("/login/user");
      return;
    }
    setUser(storedUser);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-bg text-text">

      

      <div className="p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">My Tasks</h1>

         
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { label: "Total", value: stats.total },
            { label: "Completed", value: stats.completed, color: "text-green-600" },
            { label: "Pending", value: stats.pending, color: "text-yellow-600" },
            { label: "In Progress", value: stats.inProgress, color: "text-blue-600" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border p-5 rounded-2xl">
              <p className="text-muted">{item.label}</p>
              <h2 className={`text-2xl font-bold ${item.color || ""}`}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl mb-6">
          <h2 className="font-semibold mb-3 text-primary">Progress</h2>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{
                width:
                  stats.total === 0
                    ? "0%"
                    : `${(stats.completed / stats.total) * 100}%`,
              }}
            />
          </div>

          <p className="text-muted mt-2">
            {stats.total === 0
              ? "No tasks yet"
              : `${Math.round((stats.completed / stats.total) * 100)}% completed`}
          </p>
        </div>

        <TaskList refresh={refresh} setStats={setStats} />

      </div>
    </div>
  );
}