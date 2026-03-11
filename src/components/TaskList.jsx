import { useEffect, useState } from "react";
import api from "../services/api";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("jwtToken");

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Update task
  const updateTask = async (id, currentTitle) => {
    const newTitle = prompt("Update task", currentTitle);
    if (!newTitle) return;
    try {
      await api.put(
        `/tasks/${id}`,
        { title: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle completed
  const toggleComplete = async (task) => {
    try {
      await api.put(
        `/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p className="text-center text-white/70">Loading tasks...</p>;

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
                className="px-3 py-1 rounded-lg bg-fuchsia-800 hover:bg-fuchsia-900 transition text-white text-sm"
              >
                Update
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="px-3 py-1 rounded-lg bg-fuchsia-800 hover:bg-fuchsia-900 transition text-white text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => toggleComplete(task)}
                className={`px-3 py-1 rounded-lg ${
                  task.completed ? "bg-green-600" : "bg-fuchsia-800"
                } hover:bg-fuchsia-900 transition text-white text-sm`}
              >
                {task.completed ? "Done" : "Mark Done"}
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