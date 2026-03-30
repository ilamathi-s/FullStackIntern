import Navbar from "../components/navBar";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <Navbar />

      {/* Center Content */}
      <div className="flex flex-1 items-center justify-center px-6">

        <div className="text-center max-w-xl">

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to TaskFlow
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            A simple and efficient way to manage your daily tasks. 
            Stay organized, track your progress, and boost productivity 
            with an easy-to-use interface.
          </p>

          <div className="flex justify-center gap-4">
            <Link to="/register" className="...">Get Started</Link>
<Link to="/login" className="...">Login</Link>
          </div>

        </div>

      </div>
    </div>
  );
}