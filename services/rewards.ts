import { Reward } from "@prisma/client";
import { axiosInstance } from "./instance";

export const reward = async () => {
  const { data } = await axiosInstance.get<Reward>("/reward");
  return data;
};
