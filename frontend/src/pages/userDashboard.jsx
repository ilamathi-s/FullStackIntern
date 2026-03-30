import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navBar";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 🔒 Protect route
    if (!storedUser || storedUser.role !== "user") {
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
          User Dashboard
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

        {/* User Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-card p-6 rounded-xl shadow border border-border">
            <h2 className="font-semibold text-lg mb-2">My Tasks</h2>
            <p className="text-sm text-muted">
              View and manage your tasks.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow border border-border">
            <h2 className="font-semibold text-lg mb-2">Profile</h2>
            <p className="text-sm text-muted">
              Update your personal info.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow border border-border">
            <h2 className="font-semibold text-lg mb-2">Activity</h2>
            <p className="text-sm text-muted">
              Track your recent activity.
            </p>
          </div>

        </div>

      </div>
    </>
  );
}