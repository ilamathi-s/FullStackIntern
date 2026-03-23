import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Digital System
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">

        <TaskForm refresh={() => window.location.reload()} />

        <TaskList />

      </div>

    </div>
  );
}