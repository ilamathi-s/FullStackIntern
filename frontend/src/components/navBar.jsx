import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to={token ? "/tasks" : "/"}
          className="text-xl font-bold text-text hover:text-primary"
        >
          TaskFlow
        </Link>

        <div className="flex items-center gap-4">

        
            <button
  onClick={toggleTheme}
  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-lg"
>
  {theme === "dark" ? <FiSun /> : <FiMoon />}
</button>
        

          {token && (
            <>
              <Link to="/tasks" className="text-muted hover:text-primary">
                Tasks
              </Link>

              <Link to="/create-task" className="text-muted hover:text-primary">
                Create
              </Link>

              <button
                onClick={() =>
                  navigate(
                    user?.role === "admin"
                      ? "/admin-dashboard"
                      : "/user-dashboard"
                  )
                }
                className="px-3 py-1 bg-primary text-white rounded-lg"
              >
                {user?.role === "admin" ? "Admin" : "User"}
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <Link to="/select-role?type=login">Login</Link>
              <Link
                to="/select-role?type=register"
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}