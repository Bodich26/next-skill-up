import { Task } from "@prisma/client";
import { axiosInstance } from "./instance";

export const getTasksList = async () => {
  const response = await axiosInstance.get<Task[]>("/tasks");
  const data = await response.data;
  return data;
};

export const postNewTaskToUser = async (
  userId: string,
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

export const setStudyTimeToUser = async (time: number, userId: string) => {
  try {
    const { data } = await axiosInstance.put("/tasks", {
      time,
      userId,
    });

    return data;
  } catch (error) {
    console.error("Error set study time to User:", error);
    throw error;
  }
};
