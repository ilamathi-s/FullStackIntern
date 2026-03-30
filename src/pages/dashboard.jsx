import Navbar from "../components/navBar";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-bg p-6">
  <div className="flex justify-between items-center mb-8 bg-card px-6 py-4 rounded-2xl shadow-sm border border-border">

    <div>
      <h1 className="text-2xl font-bold text-text">
        Task Dashboard
      </h1>

      <p className="text-sm text-muted">
        Manage your workflow efficiently
      </p>
    </div>

    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }}
      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
    >
      Logout
    </button>
  </div>

  <div className="grid lg:grid-cols-3 gap-6">
    <div className="lg:col-span-1">
      <TaskForm refresh={() => window.location.reload()} />
    </div>

    <div className="lg:col-span-2">
      <TaskList />
    </div>
  </div>
</div>
  );
}