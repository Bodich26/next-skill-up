"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui";
import { TaskItem } from "./taskItem";
import { UserType } from "@/type";

import UserData from "@/data/user.json";
import { useFilterName } from "@/hooks";
const user: UserType[] = UserData;
const tasksUser = user[0].tasks;

interface Props {}

export const TasksList: React.FC<Props> = () => {
  const { filterName, setFilterName, handleFilterName } = useFilterName("");

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
      <div className="flex flex-col gap-3 overflow-y-auto min-h-[700px] max-h-[700px] mt-7">
        {tasksUser.length === 0 ? (
          // eslint-disable-next-line react/no-unescaped-entities
          <p className="text-center text-xl">You don't have any tasks</p>
        ) : (
          tasksUser
            .filter((task) => task.name.toLowerCase().includes(filterName))
            .map((task, index) => (
              <TaskItem
                key={index}
                taskName={task.name}
                taskPoints={task.points}
                taskType={task.type}
              />
            ))
        )}
      </div>
    </div>
  );
};
