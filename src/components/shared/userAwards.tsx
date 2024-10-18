"use client";
import React, { useEffect } from "react";

import { UserType } from "@/type";
import Image from "next/image";
import { AddAwardPopUp } from "../ui";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addRewardToUser, fetchRewards } from "@/redux/slices/rewardSlice";
import { fetchUser } from "@/redux/slices/userSlice";
import { Reward } from "@prisma/client";

interface IUsers {
  user: UserType | null;
}

export default function UserAwards({ user }: IUsers) {
  const dispatch = useAppDispatch();
  const { data: reward } = useSelector((state: RootState) => state.reward);

  useEffect(() => {
    dispatch(fetchRewards());
  }, [dispatch, user]);

  const obtainedRewardIds =
    user.awards.map((userReward: Reward) => userReward.id) || [];

  const filteredRewards = Array.isArray(reward)
    ? reward.filter((r) => r.role === user.role)
    : [];

  const handleAwardPopUp = async (userId: number, rewardId: number) => {
    try {
      const resultAction = await dispatch(
        addRewardToUser({ userId, rewardId })
      );

      if (addRewardToUser.fulfilled.match(resultAction)) {
        dispatch(fetchRewards());
        dispatch(fetchUser(user.id));
        console.log("Reward added successfully!", resultAction.payload);
      } else {
        console.error("Failed to add reward:", resultAction.error);
      }
    } catch (error) {
      console.error("Error adding reward:", error);
    }
  };

  return (
    <div className="border-[1px] p-4 border-solid border-input bg-card rounded-lg">
      <h3 className="font-bold text-3xl mb-3">List of awards</h3>
      <div className="max-h-[434px] min-h-[434px]">
        <div className="flex flex-row flex-wrap justify-start gap-6 overflow-y-auto max-h-[434px]">
          {filteredRewards.map((reward) => {
            const isRewardObtained = obtainedRewardIds.includes(reward.id);
            if (isRewardObtained) {
              return (
                <div key={reward.id} className="w-[128px] h-[128px]">
                  <Image
                    src={reward.icon}
                    width={128}
                    height={128}
                    alt={reward.name}
                  />
                </div>
              );
            } else {
              return (
                <AddAwardPopUp
                  key={reward.id}
                  point={reward.points}
                  nameAward={reward.name}
                  descAward={reward.description}
                  imgAward={reward.icon}
                  onClick={() => handleAwardPopUp(user.id, reward.id)}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
