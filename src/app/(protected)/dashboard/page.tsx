"use client";

import { GetUsers } from "@/components/getUsers";
import { Leaderboard } from "@/components/shared/leaderboard";
import { useCurrentUser } from "@/hooks";

export default function Dashboard() {
  const userId = useCurrentUser();

  return (
    <div className="flex justify-between gap-8 ">
      <div className="basis-[66%] flex flex-col gap-8">
        <GetUsers userId={userId} />
      </div>
      <div className="basis-[34%] border-[1px] border-solid border-input bg-card row-span-2 rounded-lg p-4">
        <Leaderboard />
      </div>
    </div>
  );
}
