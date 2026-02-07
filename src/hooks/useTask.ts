import { useState } from "react";
import { type Task } from "../types/todo";
import api from "../utils/api";
import { toast } from "react-toastify";
export const useTask = () => {
  const [taskValue, setTaskValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const fetchTasks = async () => {
    try {
      const response = await api.get("/task");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateTask = async () => {
    try {
      const response = await api.post("/task", {
        task: taskValue,
        isCompleted: false,
      });
      if (response.status === 200) {
        setTasks((prev) => [...prev, response.data.tasks]);
      
        setTaskValue("");
        // authorization header 추가

        toast.info("할 일을 추가했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    try {
      const response = await api.put(`/task/${id}`, {
        isCompleted: !task.isCompleted,
      });

      if (response.status === 200) {
        setTasks((prev) =>
          prev.map((t) =>
            t._id === id ? { ...t, isCompleted: !t.isCompleted } : t
          )
        );
        toast.success(!task.isCompleted ? "할일 끝!" : "다시 시작!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await api.delete(`/task/${id}`);
      if (response.status === 200) {
        setTasks((prev) => prev.filter((t) => t._id !== id));
        toast.error("삭제되었습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    tasks,
    taskValue,
    setTaskValue,
    fetchTasks,
    handleCreateTask,
    handleDeleteTask,
    handleUpdateTask,
  };
};
