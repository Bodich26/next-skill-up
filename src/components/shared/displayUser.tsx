"use client";

import React from "react";
import Image from "next/image";
import { UserType } from "@/type";

interface IUsers {
  user: UserType | null;
}

export default function DisplayUser({ user }: IUsers) {
  return (
    <div className="border-[1px] border-solid border-input bg-card flex gap-9 items-start p-4 rounded-lg">
      <Image
        src={user?.iconRating || ""}
        width={214}
        height={214}
        alt="Rating"
      />
      <div className="flex flex-col gap-2 ">
        <h3 className="font-bold text-3xl">{user?.name}</h3>
        <dl className="flex gap-2">
          <dt>Очки рейтинга:</dt>
          <dd className="font-bold text-base">{user?.rating}</dd>
        </dl>
        <dl className="flex gap-2">
          <dt>Время изучения:</dt>
          <dd className="font-bold text-base">{user?.studyTimes}</dd>
        </dl>
        <dl className="flex gap-2">
          <dt>Выполненных задач:</dt>
          <dd className="font-bold text-base">{user?.taskCompleted}</dd>
        </dl>
      </div>
    </div>
  );
}
