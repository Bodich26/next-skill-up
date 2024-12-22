"use client";

import React from "react";
import { useSelector } from "react-redux";
import {
  setTaskDifficulty,
  setTaskName,
  addNewTaskToUser,
} from "../../redux/slices/tasksSlice";

import { useCurrentUser, useResetFilter } from "@/hooks";
import { Button, Input, Select } from "../ui";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Difficulty } from "@/type";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { toast } from "sonner";

interface Props {
  className?: string;
}

export const TasksForm: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const userCurrent = useCurrentUser();

  const { taskName, taskDifficulty } = useSelector(
    (state: any) => state.tasks.form
  );

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (taskName && taskDifficulty) {
      const loadingCreateTask = toast.loading("Loading...");

      const newTask = {
        userId: userCurrent!.id!,
        name: taskName,
        difficulty: taskDifficulty,
        completed: false,
      };

      try {
        await dispatch(addNewTaskToUser(newTask));
        toast.success("Task is to successfully create!");
        handleResetFilters();
      } catch (error) {
        toast.error("Failed to create task.");
      } finally {
        toast.dismiss(loadingCreateTask);
      }
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
