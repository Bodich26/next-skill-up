"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Gauge, MessageSquareText, List } from "lucide-react";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
}

const menuItem = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <Gauge size={24} />,
      },
      {
        title: "Messages",
        path: "/dashboard/messages",
        icon: <MessageSquareText size={24} />,
      },
      {
        title: "Tasks",
        path: "/dashboard/tasks",
        icon: <List size={24} />,
      },
    ],
  },
];

export const Sidebar: React.FC<Props> = ({ className }) => {
  const pathName = usePathname();
  return (
    <div className={cn("p-4", className)}>
      <Link className=" flex justify-center mb-12 " href="/dashboard">
        <Image src={Logo} width={132} height={54} alt="Logo" />
      </Link>
      <ul>
        {menuItem.map((item) => {
          return (
            <li key={item.title} className="flex flex-col gap-y-5">
              {item.list.map((link) => (
                <Link
                  key={item.title}
                  href={link.path}
                  className={cn(
                    "flex gap-4 p-2 border-[1px] border-solid border-input bg-input rounded-lg w-[195px] hover:bg-primary transition-bg duration-300 ease-in-out",
                    pathName === link.path && "bg-primary"
                  )}
                >
                  {link.icon}
                  {link.title}
                </Link>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
