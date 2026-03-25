import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* App Name */}
        <Link
  to="/"
  className="text-xl font-bold text-gray-800 hover:text-blue-500 transition"
>
  TaskFlow
</Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-gray-600 hover:text-blue-500 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}