
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/tasks").then((res) => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await axios.post("http://localhost:3001/tasks", { title: newTask });
    setTasks([...tasks, res.data]);
    setNewTask("");
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">React Frontend</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border rounded p-2"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <table className="w-full border border-gray-300 rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="text-center">
              <td className="border px-4 py-2">{task.id}</td>
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
