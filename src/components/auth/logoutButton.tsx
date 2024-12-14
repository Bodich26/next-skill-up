"use client";

import { logout } from "@/app/api/auth/loguot/route";
import { Button } from "../ui";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  const onClick = () => {
    logout();
  };

  return (
    <Button
      className="bg-input py-1 px-3 rounded-lg cursor-pointer hover:bg-primary transition-bg duration-300 ease-in-out"
      onClick={onClick}
      type="submit"
    >
      <LogOut size={24} />
    </Button>
  );
};
