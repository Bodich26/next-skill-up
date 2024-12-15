"use client";

import { logout } from "@/app/api/auth/loguot/route";

interface ILogoutButton {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: ILogoutButton) => {
  const onClick = () => {
    logout();
  };

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
