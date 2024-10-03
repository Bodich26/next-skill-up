"use client";

import React, { useEffect } from "react";
import { Api } from "../../../services/api-client";
import { RewardsType, UserType } from "@/type";
import Image from "next/image";

interface IUsers {
  user: UserType | null;
}

export default function UserAwards({ user }: IUsers) {
  const [rewards, setRewards] = React.useState<RewardsType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  useEffect(() => {
    const fetchRewards = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const rewardsData = await Api.rewards.reward();
        setRewards(rewardsData);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching rewards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [user]);

  const filteredRewards = rewards.filter(
    (reward) => reward.role === user?.role
  );

  return (
    <div className="flex flex-row flex-wrap justify-center items-start gap-6 overflow-y-auto max-h-[425px]">
      {loading ? (
        <p>Loading rewards...</p>
      ) : error ? (
        <p>Error loading rewards: {error}</p>
      ) : filteredRewards.length > 0 ? (
        filteredRewards.map((reward) => (
          <div key={reward.id} className="w-[128px] h-[128px]">
            <Image
              src={reward.icon}
              width={128}
              height={128}
              alt={reward.name}
            />
          </div>
        ))
      ) : (
        <p>No rewards available for your role.</p>
      )}
    </div>
  );
}
