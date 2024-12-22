import { User } from "@prisma/client";
import { axiosInstance } from "./instance";

export const user = async (id: string) => {
  try {
    console.log("Fetching user with ID:", id);
    const { data } = await axiosInstance.get<User>(`/users/${id}`);
    return data;
  } catch (error: any) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};
