import { useEffect, useState } from "react";
import api from "../services/api";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("jwtToken");

  const fetchTasks = async () => {
    const res = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setTasks(res.data.data || []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTasks();
  };

  const updateTask = async (id, title) => {
    const newTitle = prompt("Update task", title);

    if (!newTitle) return;

    await api.put(
      `/tasks/${id}`,
      { title: newTitle },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchTasks();
  };

  return (
    <div className="space-y-3 text-white mt-6">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center px-4 py-3 rounded-xl bg-white/10 border border-white/20"
          >
            <p>{task.title}</p>

            <div className="flex gap-2">
              <button
                onClick={() => updateTask(task._id, task.title)}
  className="px-3 py-1 rounded-lg bg-fuchsia-800  hover:bg-fuchsia-900 transition text-white text-sm"
              >
                Update
              </button>

              <button
                onClick={() => deleteTask(task._id)}
  className="px-3 py-1 rounded-lg bg-fuchsia-800  hover:bg-fuchsia-900 transition text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-white/60">No tasks yet</p>
      )}
    </div>
  );
}

export default TaskList;