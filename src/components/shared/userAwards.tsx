"use client";

import React, { useEffect } from "react";
import { RewardsType, UserType } from "@/type";
import Image from "next/image";
import { AddAwardPopUp } from "../ui";
import { UserAwardType } from "@/type/user";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchReward } from "@/redux/slices/rewardSlice";

interface IUsers {
  user: UserType | null;
}

export default function UserAwards({ user }: IUsers) {
  const dispatch = useAppDispatch();
  const {
    data: reward,
    status,
    error,
  } = useSelector((state: RootState) => state.reward);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchReward());
    }
  }, [dispatch, status]);

  const filteredRewards = reward
    ? reward.filter((r) => r.role === user?.role)
    : [];

  const obtainedRewardIds = (user?.awards || []).map(
    (award: UserAwardType) => award.rewardId
  );

  const handleAwardPopUp = (reward: RewardsType) => {};

  return (
    <div className="border-[1px] p-4 border-solid border-input bg-card rounded-lg">
      <h3 className="font-bold text-3xl mb-3">List of awards</h3>
      <div className="max-h-[434px] min-h-[434px]">
        <div className="flex flex-row flex-wrap justify-start gap-6 overflow-y-auto max-h-[434px]">
          {filteredRewards.map((reward) => {
            if (obtainedRewardIds.includes(reward.id)) {
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
                  onClick={() => console.log()}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
