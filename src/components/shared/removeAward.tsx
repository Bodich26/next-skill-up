import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { removeRewardToUser } from "@/redux/slices/rewardSlice";
import { fetchUser } from "@/redux/slices/userSlice";
import { X } from "lucide-react";
import React from "react";
import { Toaster } from "../ui";
import { toast } from "sonner";

interface Props {
  className?: string;
  rewardId: number;
  userId: string;
}

export const RemoveAward: React.FC<Props> = ({
  className,
  rewardId,
  userId,
}) => {
  const dispatch = useAppDispatch();

  const handleRemoveAwards = async (rewardId: number, userId: string) => {
    const loadingToastId = toast.loading("Loading...");

    try {
      const resultAction = await dispatch(
        removeRewardToUser({ userId, rewardId })
      );

      if (removeRewardToUser.fulfilled.match(resultAction)) {
        await dispatch(fetchUser(userId));
        toast.success("Reward remove successfully!");
      } else if (removeRewardToUser.rejected.match(resultAction)) {
        toast.error("Error removing reward.");
      }
    } catch (error) {
      toast.error("An error occurred while removing the reward.");
    } finally {
      toast.dismiss(loadingToastId);
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
      <Toaster position="bottom-left" expand={false} />
    </>
  );
};
