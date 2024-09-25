"use client";

import React from "react";
import { UserType, SkillsType } from "@/type";
import Image from "next/image";
import { AddAwardPopUp } from "../ui";

import UserData from "../../data/user.json";
import SkillsData from "../../data/skills.json";
const User: UserType[] = UserData;
const skills: SkillsType[] = SkillsData;

export default function UserAwards() {
  const handleAwardPopUp = () => {};

  const user = User[0];
  return (
    <div className="flex flex-row flex-wrap justify-center items-start gap-6 overflow-y-auto max-h-[425px]">
      {Object.keys(skills[0]).map((skill) => {
        const award = user.awards[skill as keyof typeof user.awards];
        const skillData = skills[0][skill as keyof (typeof skills)[0]];

        return award ? (
          <div key={skill} className="w-[128px] h-[128px] ">
            <Image src={award.icon} width={128} height={128} alt="IconAward" />
          </div>
        ) : (
          <AddAwardPopUp
            key={skill}
            point={skillData.point}
            nameAward={skillData.name}
            descAward={skillData.desc}
            imgAward={skillData.icon}
            onClick={() => handleAwardPopUp()}
          />
        );
      })}
    </div>
  );
}
