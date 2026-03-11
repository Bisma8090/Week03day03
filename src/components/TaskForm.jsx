import { useState } from "react";
import api from "../services/api";

function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    const token = localStorage.getItem("jwtToken");

    await api.post(
      "/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    refresh();
  };

  return (
    <form onSubmit={addTask} className="flex gap-3">
      <input
        type="text"
        placeholder="Add new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none"
      />

      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-fuchsia-800  hover:bg-fuchsia-900 text-white font-semibold transition"
      >
        Add
      </button>
    </form>
  );
}

export default TaskForm;