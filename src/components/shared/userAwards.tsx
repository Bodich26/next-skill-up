"use client";
import React from "react";
import { UserType } from "@/type";
import Image from "next/image";
import { AddAwardPopUp, Skeleton } from "../ui";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addRewardToUser, fetchRewards } from "@/redux/slices/rewardSlice";
import { fetchUser } from "@/redux/slices/userSlice";
import { Reward } from "@prisma/client";
import { RemoveAward } from "./removeAward";
import { toast } from "sonner";

interface IUsers {
  user: UserType | null;
}

export default function UserAwards({ user }: IUsers) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const dispatch = useAppDispatch();
  const {
    data: reward,
    statusAddRewards,
    statusRewards,
  } = useSelector((state: RootState) => state.reward);

  React.useEffect(() => {
    const loadingTasks = async () => {
      setIsLoading(true);
      await dispatch(fetchRewards());
      setIsLoading(false);
    };
    loadingTasks();
  }, [dispatch]);

  const obtainedRewardIds =
    user?.awards.map((userReward: Reward) => userReward.id) || [];

  const filteredRewards = Array.isArray(reward)
    ? reward.filter((r) => r.role === user?.role)
    : [];

  const handleAwardPopUp = async (userId: string, rewardId: number) => {
    const loadingToastId = toast.loading("Загрузка..");

    try {
      const resultAction = await dispatch(
        addRewardToUser({ userId, rewardId })
      );

      if (addRewardToUser.fulfilled.match(resultAction)) {
        await dispatch(fetchUser(user.id));
        toast.success("Награда успешно добавлена 😀");
      } else if (addRewardToUser.rejected.match(resultAction)) {
        toast.error("Ошибка при добавлении награды 😞");
      }
    } catch (error) {
      toast.error("Произошла ошибка при удалении награды 😞");
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div className="border-[1px] p-4 border-solid border-input bg-card rounded-lg flex-grow">
      <h3 className="font-bold text-3xl mb-3">Список наград</h3>
      <div className="flex flex-row flex-wrap justify-start gap-6 overflow-auto max-h-[485px]">
        {isLoading
          ? Array(12)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="w-[128px] h-[128px]" />
              ))
          : filteredRewards.map((reward) => {
              const isRewardObtained = obtainedRewardIds.includes(reward.id);
              return (
                <div
                  className="flex relative cursor-pointer group"
                  key={reward.id}
                >
                  {statusAddRewards === "loading" ? (
                    <Skeleton className="w-[128px] h-[128px]" />
                  ) : (
                    <>
                      {isRewardObtained ? (
                        <>
                          <div className="w-[128px] h-[128px]">
                            <Image
                              src={reward.icon}
                              width={128}
                              height={128}
                              alt={reward.name}
                            />
                          </div>
                          <RemoveAward rewardId={reward.id} userId={user.id} />
                        </>
                      ) : (
                        <AddAwardPopUp
                          point={reward.points}
                          nameAward={reward.name}
                          descAward={reward.description}
                          imgAward={reward.icon}
                          onClick={() => handleAwardPopUp(user.id, reward.id)}
                        />
                      )}
                    </>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
}
