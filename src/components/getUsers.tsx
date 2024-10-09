"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchUser } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { DisplayUser, SkeletonUser, SkeletonAward, UserAwards } from "./shared";

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
    <>
      {status === "loading" || status === "idle" ? (
        <>
          <SkeletonUser />
          <SkeletonAward />
        </>
      ) : status === "failed" ? (
        <>
          <div>
            <div className="border-[1px] border-solid border-input bg-card flex gap-9 items-start p-4 rounded-lg min-h-[258px]">
              <div className="flex flex-col gap-2 justify-center items-center ">
                <p className="font-normal text-2xl">{error} 😞</p>
              </div>
            </div>
          </div>
          <div className="border-[1px] border-solid border-input bg-card flex flex-col gap-3 items-start p-4 rounded-lg">
            <div className="max-h-[482px] min-h-[482px]">
              <div className="flex flex-row flex-wrap justify-start gap-6"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <DisplayUser user={user} />
          <UserAwards user={user} />
        </>
      )}
    </>
  );
};