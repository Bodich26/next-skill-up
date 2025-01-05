import { GetUsers } from "@/components/getUsers";
import { Leaderboard } from "@/components/shared/leaderboard";

export default async function Dashboard() {
  return (
    <div className="flex justify-between gap-8 ">
      <div className="basis-[66%] flex flex-col gap-8">
        <GetUsers />
      </div>
      <div className="basis-[34%] border-[1px] border-solid border-input bg-card rounded-lg p-4 flex-grow">
        <Leaderboard />
      </div>
    </div>
  );
}
