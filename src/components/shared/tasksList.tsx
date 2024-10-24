"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import { Input } from "../ui";
import { TaskItem } from "./taskItem";

import { useFilterName } from "@/hooks";
import { RootState } from "@/redux/store";
import {
  completedTask,
  deleteTask,
  fetchTasksList,
} from "@/redux/slices/tasksSlice";
import { cn } from "@/lib/utils";

interface Props {}

export const TasksList: React.FC<Props> = () => {
  const { filterName, setFilterName, handleFilterName } = useFilterName("");
  const tasks = useSelector((state: RootState) => state.tasks.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksList());
  }, [dispatch]);

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleCompleteTask = (id: string) => {
    dispatch(completedTask(id));
  };

  return (
    <div className="basis-[75%] border-[1px] border-solid border-input bg-card row-span-2 rounded-lg p-4">
      <div className=" flex items-center justify-between">
        <h3 className="font-bold text-3xl">Tasks List</h3>
        <div className="flex items-center gap-3">
          <Search />
          <Input
            value={filterName}
            onChange={handleFilterName}
            placeholder="Search by task name"
            className="w-[250px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto min-h-[704px] max-h-[704px] mt-7">
        {tasks.length === 0 ? (
          // eslint-disable-next-line react/no-unescaped-entities
          <p className="text-center text-xl">You don't have any tasks 😞</p>
        ) : (
          tasks
            .filter((task) => task.name.toLowerCase().includes(filterName))
            .map((task) => (
              <TaskItem
                key={task.idTask}
                taskName={task.name}
                taskPoints={task.points}
                taskDifficulty={task.difficulty}
                deleteTask={() => handleDeleteTask(task.idTask)}
                completeTask={() => handleCompleteTask(task.idTask)}
                className={cn({ "line-through": task.completed })}
                classBtnComplete={cn({ hidden: task.completed })}
              />
            ))
        )}
      </div>
    </div>
  );
};
