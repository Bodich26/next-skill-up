import { User } from "@prisma/client";
import { axiosInstance } from "./instance";

export const user = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<User>(`/users/${id}`);
    return data;
  } catch (error: any) {
    console.error("Error fetching user:", error.data || error.message);
    throw new Error(error.data.message || "Failed to fetch user");
  }
};
