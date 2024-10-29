import { Task } from "@prisma/client";
import { axiosInstance } from "./instance";

export const getTasksList = async () => {
  const { data } = await axiosInstance.get<Task[]>("/tasks");
  return data;
};

export const postNewTaskToUser = async (
  userId: number,
  taskName: string,
  taskDifficulty: string,
  completed: boolean
) => {
  const { data } = await axiosInstance.post<Task>("/tasks", {
    userId,
    name: taskName,
    difficulty: taskDifficulty,
    completed,
  });
  return data;
};

export const deleteTaskToUser = async (idTask: string) => {
  try {
    const { data } = await axiosInstance.delete("/tasks", {
      data: { idTask },
    });
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const completeTaskToUser = async (
  idTask: string,
  completed: boolean
) => {
  try {
    const { data } = await axiosInstance.patch("/tasks", {
      idTask,
      completed,
    });
    return data;
  } catch (error) {
    console.error("Error completed task:", error);
    throw error;
  }
};
