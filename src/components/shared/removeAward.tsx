"use client";

import React from "react";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { removeRewardToUser } from "@/redux/slices/rewardSlice";
import { fetchUser } from "@/redux/slices/userSlice";
import { X } from "lucide-react";
import { Toaster } from "../ui";
import { toast } from "sonner";

interface Props {
  rewardId: number;
  userId: string;
}

export const RemoveAward: React.FC<Props> = ({ rewardId, userId }) => {
  const dispatch = useAppDispatch();

  const handleRemoveAwards = async (rewardId: number, userId: string) => {
    const loadingToastId = toast.loading("Загрузка...");

    try {
      const resultAction = await dispatch(
        removeRewardToUser({ userId, rewardId })
      );

      if (removeRewardToUser.fulfilled.match(resultAction)) {
        await dispatch(fetchUser(userId));
        toast.success("Награда успешно удалена 😀");
      } else if (removeRewardToUser.rejected.match(resultAction)) {
        toast.error("Ошибка при удалении награды 😞");
      }
    } catch (error) {
      toast.error("Произошла ошибка при удалении награды 😞");
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <>
      <X
        className="
          absolute opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary ease-in cursor-pointer duration-300"
        width={18}
        height={18}
        onClick={() => handleRemoveAwards(rewardId, userId)}
      />
      <Toaster position="bottom-left" expand={false} />
    </>
  );
};
