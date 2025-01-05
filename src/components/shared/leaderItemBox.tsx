import React from "react";
import Image from "next/image";

interface Props {
  userNick: string;
  rating: number;
  studyTimes: number;
  completedTasks: number;
  userRole: string;
  urlIconRating: string;
}

export const LeaderItemBox: React.FC<Props> = ({
  userNick,
  rating,
  studyTimes,
  completedTasks,
  userRole,
  urlIconRating,
}) => {
  return (
    <div className="flex justify-between border-[1px] border-solid border-input bg-card rounded-lg w-[100%] p-3">
      <div className="flex flex-col gap-2">
        <dl className="flex gap-2">
          <dt>Nick:</dt>
          <dd className="font-bold text-base">{userNick}</dd>
        </dl>
        <dl className="flex gap-2">
          <dt>Personal rating:</dt>
          <dd className="font-bold text-base">{rating}</dd>
        </dl>
        <dl className="flex gap-2">
          <dt>Study time:</dt>
          <dd className="font-bold text-base">{studyTimes}</dd>
        </dl>
        <dl className="flex gap-2">
          <dt>Tasks completed:</dt>
          <dd className="font-bold text-base">{completedTasks}</dd>
        </dl>
        <span className="font-bold text-base">{userRole}</span>
      </div>
      <Image src={urlIconRating} width={164} height={164} alt="IconRating" />
    </div>
  );
};
