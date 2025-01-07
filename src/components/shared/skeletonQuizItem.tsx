import React from "react";
import { Skeleton } from "../ui";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const SkeletonQuizItem: React.FC<Props> = ({ className }) => {
  return Array.from({ length: 6 }).map((_, index) => (
    <Skeleton
      key={index}
      className={cn(
        "border-[1px] border-solid border-input rounded-lg w-[100%] min-h-[150px]",
        className
      )}
    />
  ));
};
