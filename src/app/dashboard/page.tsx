import { GetUsers } from "@/components/getUsers";
import { Leaderboard } from "@/components/shared/leaderboard";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] grid-rows-[1fr_2fr] gap-8">
      <GetUsers />

      <div className="border-[1px] border-solid border-input bg-card row-span-2 rounded-lg p-4">
        <Leaderboard />
      </div>
      <div className="border-[1px] border-solid border-input bg-card rounded-lg p-4">
        <h3 className="font-bold text-3xl mb-3">List of awards</h3>
      </div>
    </div>
  );
}
