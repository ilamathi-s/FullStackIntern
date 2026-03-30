import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navBar";

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

        {/* Admin Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-card p-6 rounded-xl shadow border border-border">
            <h2 className="font-semibold text-lg mb-2">Manage Users</h2>
            <p className="text-sm text-muted">
              View, add, or remove users.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow border border-border">
            <h2 className="font-semibold text-lg mb-2">View Reports</h2>
            <p className="text-sm text-muted">
              Analyze system activity.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow border border-border">
            <h2 className="font-semibold text-lg mb-2">System Settings</h2>
            <p className="text-sm text-muted">
              Configure application settings.
            </p>
          </div>

        </div>

        
      </div>
    </>
  );
}