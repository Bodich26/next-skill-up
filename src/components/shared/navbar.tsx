"use client";

import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
}

export const Navbar: React.FC<Props> = ({ className }) => {
  const pathName = usePathname();

  return (
    <div
      className={cn(
        "flex items-center justify-between border-[1px] border-solid border-input bg-card rounded-lg py-2 px-5 mb-8",
        className
      )}
    >
      <h1 className="font-bold text-4xl tracking-wide">Front-End Dev</h1>
      <div className="bg-input py-1 px-3 rounded-lg cursor-pointer hover:bg-primary transition-bg duration-300 ease-in-out">
        <LogOut size={24} />
      </div>
    </div>
  );
};
