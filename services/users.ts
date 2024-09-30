import { User } from "@prisma/client";
import { axiosInstance } from "./instance";

export const user = async (id: number) => {
  const { data } = await axiosInstance.get<User>(`/users/${id}`);
  return data;
};
