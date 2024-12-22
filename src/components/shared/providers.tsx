"use client";

import React from "react";
import { Toaster } from "../ui";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        {children}
        <Toaster position="bottom-left" expand={false} />
      </Provider>
    </>
  );
};
