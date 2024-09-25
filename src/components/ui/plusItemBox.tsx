import React from "react";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface Props {
  className?: string;
  onClick: () => void;
  nameAward?: string;
  point?: number;
}

export const PlusItemBox: React.FC<Props> = ({
  className,
  onClick,
  nameAward,
  point,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center border border-solid border-primary cursor-pointer opacity-65 hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg w-[128px] h-[128px]",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-1">
        <Plus color="#6D28D9" width={28} height={28} />
        <h3 className="font-bold">{nameAward}</h3>
        <p className="text-xl">{point}</p>
      </div>
    </div>
  );
};
