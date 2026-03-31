import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/taskList";
import TaskForm from "../components/taskForm";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 🔒 Protect route
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/login/user");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login/user");
  };

  return (
    <>

      <div className="min-h-screen bg-bg p-6">
        <div className="flex justify-between items-center mb-8 bg-card px-6 py-4 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold text-text mb-4">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 text-white px-6 py-2 rounded-lg"
        >
          Logout
        </button>
</div>
        <p className="text-muted mb-6">
          Welcome, {user?.name}
        </p>
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TaskForm refresh={() => window.location.reload()} />
            </div>
        
            <div className="lg:col-span-2">
              <TaskList />
            </div>
          </div>
       </div>
    </>
  );
}