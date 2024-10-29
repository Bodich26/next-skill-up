import React from "react";
import { Skeleton } from "../ui";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const SkeletonTask: React.FC<Props> = ({ className }) => {
  return (
    <Skeleton
      className={cn(
        "border-[1px] border-solid border-input rounded-lg p-4 w-[100%] h-[130px]",
        className
      )}
    />
  );
};
