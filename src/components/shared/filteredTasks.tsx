"use client";
import React from "react";

import {
  ArrowUpDown,
  ClipboardCheck,
  ClipboardList,
  RefreshCcw,
} from "lucide-react";
import { Popover } from "../ui";
import { PopoverContent, PopoverTrigger } from "../ui/popover";

interface IProps {
  onSortChange: (order: "easyToHard" | "hardToEasy") => void;
  onCheckCompleteTask: (completed: "all" | "complete" | "available") => void;
}

export const FilteredTasks = ({
  onSortChange,
  onCheckCompleteTask,
}: IProps) => {
  const [isOpenFilter, setIsOpenFilter] = React.useState(false);

  const handleFilterOpen = () => setIsOpenFilter(true);
  const handleFilterClose = () => setIsOpenFilter(false);

  const handleFilterEasy = () => {
    handleFilterClose();
    onSortChange("easyToHard");
  };
  const handleFilterHard = () => {
    handleFilterClose();
    onSortChange("hardToEasy");
  };
  const handleResetFilter = () => {
    onCheckCompleteTask("all");
  };

  return (
    <div className=" flex items-center gap-3">
      <ClipboardCheck
        className="cursor-pointer hover:text-primary duration-150"
        onClick={() => onCheckCompleteTask("complete")}
      />
      <ClipboardList
        className="cursor-pointer hover:text-primary duration-150"
        onClick={() => onCheckCompleteTask("available")}
      />
      <Popover open={isOpenFilter} onOpenChange={setIsOpenFilter}>
        <PopoverTrigger>
          <ArrowUpDown
            className="hover:text-primary duration-150"
            onClick={handleFilterOpen}
          />
        </PopoverTrigger>
        <PopoverContent className=" p-[9px] text-center flex flex-col gap-2 max-w-[250px]">
          <p
            className="text-base cursor-pointer hover:opacity-75 duration-150"
            onClick={handleFilterEasy}
          >
            Sort by: Show
            <span className="text-primary"> Easy</span> Tasks First
          </p>
          <p
            className="text-base cursor-pointer hover:opacity-75 duration-150"
            onClick={handleFilterHard}
          >
            Sort by: Show
            <span className="text-primary"> Hard</span> Tasks First
          </p>
        </PopoverContent>
      </Popover>
      <RefreshCcw
        className="cursor-pointer hover:text-primary duration-150"
        onClick={handleResetFilter}
      />
    </div>
  );
};
