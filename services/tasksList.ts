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
