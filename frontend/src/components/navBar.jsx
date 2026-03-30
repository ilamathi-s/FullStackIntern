import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-xl font-bold text-text hover:text-primary transition"
        >
          TaskFlow
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/select-role?type=login"
            className="px-4 py-2 text-muted hover:text-primary transition"
          >
            Login
          </Link>

          <Link
            to="/select-role?type=register"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}