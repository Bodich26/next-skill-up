import { GetUsers } from "@/components/getUsers";
import { Leaderboard } from "@/components/shared/leaderboard";
import { auth } from "../../../../auth";

export default async function Dashboard() {
  const session = await auth();
  return (
    <div className="flex justify-between gap-8 ">
      <div className="basis-[66%] flex flex-col gap-8">
        {JSON.stringify(session)}
        <GetUsers />
      </div>
      <div className="basis-[34%] border-[1px] border-solid border-input bg-card row-span-2 rounded-lg p-4">
        <Leaderboard />
      </div>
    </div>
  );
}
