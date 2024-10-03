// MainComponent.tsx
"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchUser } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { DisplayUser, UserAwards } from "./shared";

export const GetUsers = () => {
  const dispatch = useAppDispatch();
  const {
    data: user,
    status,
    error,
  } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (status === "idle" && !user) {
      dispatch(fetchUser(1));
    }
  }, [status, dispatch, user]);

  return (
    <div>
      {status === "loading" ? (
        <p>Loading user data...</p>
      ) : status === "failed" ? (
        <p>Failed to load user: {error}</p>
      ) : (
        <div>
          <DisplayUser user={user} />
          <UserAwards user={user} />
        </div>
      )}
    </div>
  );
};
