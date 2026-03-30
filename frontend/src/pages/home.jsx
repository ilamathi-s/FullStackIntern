import Navbar from "../components/navBar";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">

  <Navbar />

  <div className="flex flex-1 items-center justify-center px-6">

    <div className="text-center max-w-xl">

      <h1 className="text-4xl font-bold text-text mb-4">
        Welcome to TaskFlow
      </h1>

      <p className="text-muted text-lg mb-6">
        A simple and efficient way to manage your daily tasks.
      </p>

      <div className="flex justify-center gap-4">
        <Link to="/select-role?type=register" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-hover">
          Get Started
        </Link>

        <Link to="/select-role?type=login" className="border border-border px-6 py-2 rounded-lg text-text hover:bg-gray-100">
          Login
        </Link>
      </div>

    </div>
  </div>
</div>
  );
}