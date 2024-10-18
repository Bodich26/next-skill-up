import { Reward } from "@prisma/client";
import { axiosInstance } from "./instance";

export const getRewardId = async (id: number) => {
  const { data } = await axiosInstance.get<Reward>(`/reward/${id}`);
  return data;
};

export const getListRewards = async () => {
  const { data } = await axiosInstance.get<Reward[]>("/reward");
  return data;
};

export const postRewardToUser = async (userId: number, rewardId: number) => {
  const { data } = await axiosInstance.post(`/reward`, {
    userId,
    rewardId,
  });
  return data;
};
