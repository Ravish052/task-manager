"use client";
import { useState, useEffect } from "react";

interface Task {
  _id: string;
  title: string;
  priority: string;
  status: string;
}

interface TaskFormProps {
  onTaskAdded: () => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

export default function TaskForm({ onTaskAdded, editingTask, setEditingTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setPriority("medium");
      setStatus("todo");
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!title.trim()) return;
  
    const url = editingTask?._id ? `/api/tasks/${editingTask._id}` : "/api/tasks";
    const method = editingTask ? "PATCH" : "POST";
    const body = JSON.stringify({ 
      title: title.trim(), 
      priority: priority.trim(), 
      status: status.trim() 
    });
  
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(response)
        throw new Error(errorMessage || "Failed to save task");
      }
  
      setTitle("");
      setPriority("medium");
      setStatus("todo");
      setEditingTask(null);
      onTaskAdded();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error saving task:", error.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded text-gray-800 placeholder-gray-500"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2 rounded text-gray-800"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      {editingTask && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded text-gray-800"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      )}
      <button
        type="submit"
        className={`px-4 py-2 rounded ${editingTask ? "dark:invert bg-[#86EE02]" : "dark:invert bg-[#03301D]"} text-white`}
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
