"use client";

import React from "react";
import { useFilterName } from "@/hooks";
import { useResetFilter } from "@/hooks";
import { Input, Select } from "../ui";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { LeaderItemBox } from "./leaderItemBox";
import { UserLeadersType } from "@/type";

const userLeaders: UserLeadersType[] = [
  {
    id: 1,
    name: "Bodich",
    role: "Front-End",
    rating: 2343,
    studyTimes: 2134,
    taskCompleted: 453,
    iconRating: "https://imgur.com/2ntrT0c.png",
  },
  {
    id: 2,
    name: "Nesti",
    role: "Ui/Ux Designer",
    rating: 1232,
    studyTimes: 980,
    taskCompleted: 45,
    iconRating: "https://imgur.com/ulteW6T.png",
  },
  {
    id: 3,
    name: "IlMal",
    role: "Ui/Ux Designer",
    rating: 1320,
    studyTimes: 456,
    taskCompleted: 34,
    iconRating: "https://imgur.com/h9FvrGn.png",
  },
  {
    id: 4,
    name: "eNZi",
    role: "CG-Artist",
    rating: 1450,
    studyTimes: 780,
    taskCompleted: 66,
    iconRating: "https://imgur.com/rpvUiTy.png",
  },
];

interface Props {
  className?: string;
}

export const Leaderboard: React.FC<Props> = ({ className }) => {
  const [selectedUserRole, setSelectedUserRole] = React.useState<string>("");

  const { filterName, setFilterName, handleFilterName } = useFilterName("");
  const { handleResetFilters } = useResetFilter([
    setFilterName,
    setSelectedUserRole,
  ]);

  return (
    <>
      <h3 className="font-bold text-3xl text-center">Skill Up</h3>
      <p className="text-center mt-3">Таблица Лидеров</p>
      <div className="flex items-center justify-between gap-7 mt-7">
        <Input
          value={filterName}
          onChange={handleFilterName}
          placeholder="Введите Ник"
          className="max-w-[190px]"
        />
        {(filterName || selectedUserRole) && (
          <span
            className="text-sm opacity-50 cursor-pointer text-center hover:opacity-100 transition-opacity duration-300 ease-in-out"
            onClick={handleResetFilters}
          >
            Сброс
          </span>
        )}
        <Select value={selectedUserRole} onValueChange={setSelectedUserRole}>
          <SelectTrigger className="max-w-[190px]">
            <SelectValue placeholder="Выберите роль" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Front-End">Front-End</SelectItem>
            <SelectItem value="Back-End">Back-End</SelectItem>
            <SelectItem value="Ui/Ux Designer">Ui/Ux Designer</SelectItem>
            <SelectItem value="CG-Artist">CG-Artist</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-start gap-6 overflow-y-auto max-h-[650px] mt-7">
        {userLeaders
          .filter((user) => {
            const userNick = user.name.includes(filterName);
            const userRole = selectedUserRole
              ? user.role === selectedUserRole
              : true;
            return userNick && userRole;
          })
          .map((user, index) => {
            return (
              <LeaderItemBox
                key={index}
                userNick={user.name}
                userRole={user.role}
                rating={user.rating}
                urlIconRating={user.iconRating}
                studyTimes={user.studyTimes}
                completedTasks={user.taskCompleted}
              />
            );
          })}
      </div>
    </>
  );
};
