"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface Props {
  className?: string;
}

export const Navbar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-[1px] border-solid border-input bg-card rounded-lg py-2 px-5 mb-8",
        className
      )}
    >
      <h1 className="font-bold text-4xl tracking-wide">Front-End Dev</h1>
      <div
        className="bg-input py-1 px-3 rounded-lg cursor-pointer hover:bg-primary transition-bg duration-300 ease-in-out"
        onClick={() => signOut()}
      >
        <LogOut size={24} />
      </div>
    </div>
  );
};
