import React from "react";
import { Skeleton } from "../ui";

interface Props {
  className?: string;
}

export const SkeletonUser: React.FC<Props> = ({ className }) => {
  return (
    <div className="border-[1px] border-solid border-input bg-card flex gap-9 items-start p-4 rounded-lg">
      <Skeleton className="h-[214px] w-[214px]" />
      <div className="flex basis-[20%] flex-col gap-2 ">
        <Skeleton className="h-9 w-full" />
        <dl className="flex gap-2 max-w-[100%]">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[40px]" />
        </dl>
        <dl className="flex gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[40px]" />
        </dl>
        <dl className="flex gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[40px]" />
        </dl>
      </div>
    </div>
  );
};
