import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative p-4 sm:p-8"
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/1495542786/photo/aurora-borealis.webp?a=1&b=1&s=612x612&w=0&k=20&c=6RGlA_cQ0oO0tIz9MjL7IvVIZMxwPipAi1oqyKcDyvs=)`,
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60 rounded-2xl backdrop-blur-md bg-white/10 border border-white/40"></div>

      <div className="relative w-full max-w-4xl flex flex-col md:flex-row gap-6">

        {/* Left Panel */}
        <div className="flex-1 flex flex-col text-white">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Task Manager</h1>
              <p className="text-white/70 text-sm sm:text-base">Manage your daily tasks</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-white hover:text-white hover:bg-fuchsia-700 transition text-fuchsia-900 text-sm sm:text-base"
            >
              <strong>Logout</strong>
            </button>
          </div>

          {/* Glass Card */}
          <div className="rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl flex flex-col gap-4 sm:gap-6">
            {/* Add Task Form */}
            <TaskForm refresh={() => setRefreshKey(prev => prev + 1)} />

            {/* Divider */}
            <div className="border-t border-white/20"></div>

            {/* Task List */}
            <TaskList key={refreshKey} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;