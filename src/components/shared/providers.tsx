"use client";

import React from "react";
import { Toaster } from "../ui";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster position="bottom-left" expand={false} />
    </>
  );
};
