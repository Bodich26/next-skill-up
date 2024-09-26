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
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  setTaskDifficulty,
  setTaskName,
} from "../../redux/slices/tasksSlice";
import { object } from "zod";
import { Difficulty } from "@/type";

interface Props {
  className?: string;
}

export const TasksForm: React.FC<Props> = ({ className }) => {
  const { taskName, taskDifficulty } = useSelector(
    (state: any) => state.tasks.form
  );
  const dispatch = useDispatch();

  const { handleResetFilters } = useResetFilter([
    () => dispatch(setTaskName("")),
    () => dispatch(setTaskDifficulty("")),
  ]);

  const handleNameTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTaskName(e.target.value));
  };

  const handleDifficultyChange = (value: string) => {
    dispatch(setTaskDifficulty(value as Difficulty));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (taskName && taskDifficulty) {
      const newTask = {
        taskName,
        taskDifficulty,
      };
      handleResetFilters();
      dispatch(addTask(newTask));
    }
  };

  return (
    <div className="basis-[25%] border-[1px] border-solid border-input bg-card rounded-lg p-4">
      <h3 className="font-bold text-3xl text-center mb-6">Create a Tasks</h3>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center m-auto max-w-[250px]"
      >
        <Input
          value={taskName}
          onChange={(e) => handleNameTask(e)}
          placeholder="Enter the task name"
          className="max-w-[100%]"
        />
        <Select value={taskDifficulty} onValueChange={handleDifficultyChange}>
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
            <SelectItem value="Learning info">Learning info</SelectItem>
          </SelectContent>
        </Select>
        {(taskName || taskDifficulty) && (
          <Button
            variant="secondary"
            size="lg"
            className="text-lg h-9 inline"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        )}
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="text-lg h-9"
        >
          Add Task
        </Button>
      </form>
    </div>
  );
};
