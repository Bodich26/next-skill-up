import React from "react";
import { Bookmark, CircleDollarSign, Settings } from "lucide-react";
import { Button, TimeTaskPopUp } from "../ui";
import { cn } from "@/lib/utils";

interface Props {
  taskName: string;
  taskPoints?: number;
  taskDifficulty: string;
  deleteTask: () => void;
  className?: string;
  classBtnComplete?: string;
  onClickConfirmPopUpBtn: () => void;
}

export const TaskItem: React.FC<Props> = ({
  taskName,
  taskPoints,
  taskDifficulty,
  deleteTask,
  className,
  classBtnComplete,
  onClickConfirmPopUpBtn,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between border-[1px] border-solid border-input bg-card rounded-lg p-4 w-[100%]",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <dl className="flex items-center gap-2">
          <Bookmark className="text-primary" />
          <dt>Task name:</dt>
          <dd className="font-bold text-base">{taskName}</dd>
        </dl>
        <dl className="flex items-center gap-2">
          <CircleDollarSign className="text-primary" />
          <dt>Total points:</dt>
          <dd className="font-bold text-base">{taskPoints}</dd>
        </dl>
        <dl className="flex items-center gap-2">
          <Settings className="text-primary" />
          <dt>Task type:</dt>
          <dd className="font-bold text-base">{taskDifficulty}</dd>
        </dl>
      </div>
      <div>
        <TimeTaskPopUp
          triggerButton={
            <Button
              variant="default"
              size="lg"
              className={cn(
                "text-lg h-9 w-[145px] mb-[23px]",
                classBtnComplete
              )}
            >
              Complete
            </Button>
          }
          classNameTrigger={cn(classBtnComplete)}
          onClickConfirmPopUp={onClickConfirmPopUpBtn}
        />
        <Button
          onClick={deleteTask}
          variant="secondary"
          size="lg"
          className="text-lg h-9 w-[145px]"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
