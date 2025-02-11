"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";

interface Task {
  _id: string;
  title: string;
  status: string;
  priority:string
  reminderAt?: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  useEffect(() => {
    if (session) fetchTasks();
  }, [session]);

  return (
    <div className="w-full h-full md:w-[487px] border-none shadow-none"   >
      <div className="p-5">
        
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Welcome, {session?.user?.name}</h2>
          <button onClick={handleLogout} className="bg-red-400 text-white px-2 py-1 rounded">Logout</button>
        </div>

        <h3 className="text-xl mt-6">Add Task</h3>
        <TaskForm 
          onTaskAdded={fetchTasks} 
          editingTask={editingTask} 
          setEditingTask={setEditingTask} 
        />

        <h3 className="text-xl mt-6">Your Tasks</h3>
        <ul className="mt-2">
          {tasks.map((task) => (
            <li
            key={task._id}
            className={`border p-2 mt-2 flex justify-between ${
              task.priority === "high"
                ? "bg-red-500 text-white"
                : task.priority === "medium"
                ? "bg-yellow-500 text-black"
                : "bg-blue-500 text-white"
            }`}
          >
            <span>{task.title} - {task.status} - {task.priority}</span>
            <div>
              <button onClick={() => setEditingTask(task)} className="bg-white text-black px-3 py-1 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(task._id)} className="bg-red-700 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
          
          ))}
        </ul>


      </div>
    </div>
  );
}
