"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "../auth";
import { useCurrentUser } from "@/hooks";

interface Props {
  className?: string;
}

export const Navbar: React.FC<Props> = ({ className }) => {
  const userCurrent = useCurrentUser();

  return (
    <div
      className={cn(
        "flex items-center justify-between border-[1px] border-solid border-input bg-card rounded-lg py-2 px-5 mb-8",
        className
      )}
    >
      <h1 className="font-bold text-4xl tracking-wide">
        {userCurrent?.role.replace(/_/g, " ")}
      </h1>
      <LogoutButton />
    </div>
  );
};
