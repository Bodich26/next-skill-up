import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { removeRewardToUser } from "@/redux/slices/rewardSlice";
import { fetchUser } from "@/redux/slices/userSlice";
import { X } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  rewardId: number;
  userId: number;
}

export const RemoveAward: React.FC<Props> = ({
  className,
  rewardId,
  userId,
}) => {
  const dispatch = useAppDispatch();

  const handleRemoveAwards = async (rewardId: number, userId: number) => {
    try {
      const resultAction = await dispatch(
        removeRewardToUser({ userId, rewardId })
      );
      if (removeRewardToUser.fulfilled.match(resultAction)) {
        await dispatch(fetchUser(userId));

        console.log("Reward remove successfully!", resultAction.payload);
      } else {
        console.error("Failed to remove reward:", resultAction.error);
      }
    } catch (error) {
      console.error("Error removing reward:", error);
    }
  };

  return (
    <>
      <X
        className={cn("absolute cursor-pointer", className)}
        width={18}
        height={18}
        onClick={() => handleRemoveAwards(rewardId, userId)}
      />
    </>
  );
};
