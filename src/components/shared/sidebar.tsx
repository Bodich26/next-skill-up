"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Gauge, List, NotepadText } from "lucide-react";
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
        title: "Главная",
        path: "/dashboard",
        icon: <Gauge size={24} />,
      },
      {
        title: "Тесты",
        path: "/dashboard/tests",
        icon: <NotepadText size={24} />,
      },
      {
        title: "Задачи",
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
        {menuItem.map((item, index) => (
          <li key={index} className="flex flex-col gap-y-5">
            {item.list.map((link, index) => {
              const isActive =
                pathName === link.path ||
                (link.path !== "/dashboard" && pathName.startsWith(link.path));
              return (
                <Link
                  key={index}
                  href={link.path}
                  className={cn(
                    "flex gap-4 p-2 border-[1px] border-solid border-input bg-input rounded-lg w-[195px] hover:bg-primary transition-bg duration-300 ease-in-out",
                    isActive && "bg-primary"
                  )}
                >
                  {link.icon}
                  {link.title}
                </Link>
              );
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};
