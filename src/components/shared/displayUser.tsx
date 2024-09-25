"use client";

import Image from "next/image";
import { UserType } from "@/type/user";

import UserData from "../../data/user.json";
const User: UserType[] = UserData;

export default function DisplayUser() {
  return (
    <div className="space-y-4">
      {User.map((user) => (
        <div
          key={user.id}
          className="border-[1px] border-solid border-input bg-card flex gap-9 items-start p-4 rounded-lg"
        >
          <Image src={user.iconRating} width={223} height={224} alt="Rating" />
          <div className="flex flex-col gap-2 ">
            <h3 className="font-bold text-3xl">{user.name}</h3>
            <dl className="flex gap-2">
              <dt>Personal rating:</dt>
              <dd className="font-bold text-base">{user.rating}</dd>
            </dl>
            <dl className="flex gap-2">
              <dt>Study time:</dt>
              <dd className="font-bold text-base">{user.studyTimes}</dd>
            </dl>
            <dl className="flex gap-2">
              <dt>Tasks completed:</dt>
              <dd className="font-bold text-base">{user.taskCompleted}</dd>
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
}
