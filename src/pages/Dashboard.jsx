// src/pages/Dashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login"); // SPA navigation, no page reload
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/1495542786/photo/aurora-borealis.webp?a=1&b=1&s=612x612&w=0&k=20&c=6RGlA_cQ0oO0tIz9MjL7IvVIZMxwPipAi1oqyKcDyvs=)`,
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60 rounded-2xl backdrop-blur-md bg-white/10 border border-white/40"></div>

      <div className="relative w-[95%] max-w-lg">

        {/* Header */}
        <div className="text-white flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold">Task Manager</h1>
            <p className="text-white/70">Manage your daily tasks</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-white hover:text-white hover:bg-fuchsia-700 transition text-fuchsia-900"
          >
            <strong>Logout</strong>
          </button>
        </div>

        {/* Glass Card */}
        <div className="rounded-3xl p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

          {/* Add Task Form */}
          <TaskForm refresh={() => setRefreshKey(prev => prev + 1)} />

          {/* Divider */}
          <div className="my-6 border-t border-white/20"></div>

          {/* Task List */}
          <TaskList key={refreshKey} />

        </div>
      </div>
    </div>
  );
}

export default Dashboard;