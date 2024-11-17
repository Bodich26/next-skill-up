import { User } from "@prisma/client";
import { axiosInstance } from "./instance";

export const user = async (id: string) => {
  const { data } = await axiosInstance.get<User>(`/users/${id}`);
  return data;
};
