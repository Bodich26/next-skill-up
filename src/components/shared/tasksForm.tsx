"use client";

import React from "react";
import { useResetFilter } from "@/hooks";
import { Button, Input, Select } from "../ui";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  className?: string;
}

export const TasksForm: React.FC<Props> = ({ className }) => {
  const [taskName, setTaskName] = React.useState<string>("");
  const [selectDifficulty, setSelectDifficulty] = React.useState<string>("");

  const { handleResetFilters } = useResetFilter([
    setTaskName,
    setSelectDifficulty,
  ]);

  const handleNameTask = (e: any) => {
    setTaskName(e.target.value);
  };

  return (
    <div className="basis-[25%] border-[1px] border-solid border-input bg-card rounded-lg p-4">
      <h3 className="font-bold text-3xl text-center mb-6">Create a Tasks</h3>
      <div className="flex flex-col gap-5 justify-center m-auto max-w-[250px]">
        <Input
          value={taskName}
          onChange={(e) => handleNameTask(e)}
          placeholder="Enter the task name"
          className="max-w-[100%]"
        />
        <Select value={selectDifficulty} onValueChange={setSelectDifficulty}>
          <SelectTrigger className="max-w-[100%]">
            <SelectValue placeholder="select task type" />
          </SelectTrigger>
          <SelectContent>
            <span className="ml-2 text-primary">layouts</span>
            <SelectItem value="Easy layout">Easy layout</SelectItem>
            <SelectItem value="Medium layout">Medium layout</SelectItem>
            <SelectItem value="Hard layout">Hard layout</SelectItem>
            <span className="ml-2 text-primary">Apps</span>
            <SelectItem value="Easy App">Easy App</SelectItem>
            <SelectItem value="Medium App">Medium App</SelectItem>
            <SelectItem value="Hard App">Hard App</SelectItem>
            <span className="ml-2 text-primary">Design</span>
            <SelectItem value="Landing page Design">
              Landing page Design
            </SelectItem>
            <SelectItem value="Easy app Design">Easy app Design</SelectItem>
            <SelectItem value="Medium app Design">Medium app Design</SelectItem>
            <SelectItem value="Hard app Design">Hard app Design</SelectItem>
            <span className="ml-2 text-primary">Learning</span>
            <SelectItem value="Learning">Learning</SelectItem>
          </SelectContent>
        </Select>
        {(taskName || selectDifficulty) && (
          <Button
            variant="secondary"
            size="lg"
            className="text-lg h-9 inline"
            onClick={handleResetFilters}
          >
            Cancel
          </Button>
        )}
        <Button variant="default" size="lg" className="text-lg h-9">
          Complete
        </Button>
      </div>
    </div>
  );
};
