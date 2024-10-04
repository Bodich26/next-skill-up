import React from "react";
import { Skeleton } from "../ui";

interface Props {
  className?: string;
}

export const SkeletonAward: React.FC<Props> = ({ className }) => {
  return (
    <>
      <div
        className={`border-[1px] border-solid border-input bg-card flex flex-col gap-3 items-start p-4 rounded-lg ${className}`}
      >
        <Skeleton className="h-9 w-[210px]" />
        <div className="max-h-[434px] min-h-[434px]">
          <div className="flex flex-row flex-wrap justify-start gap-6 overflow-y-auto max-h-[434px]">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className="w-[128px] h-[128px]" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
