"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchUser } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { DisplayUser, SkeletonUser, SkeletonAward, UserAwards } from "./shared";
import { useCurrentUser } from "@/hooks";

export const GetUsers = () => {
  const userCurrent = useCurrentUser();
  const dispatch = useAppDispatch();
  const { user, statusUser, error } = useSelector(
    (state: RootState) => state.user
  );

  React.useEffect(() => {
    if (userCurrent) {
      dispatch(fetchUser(userCurrent.id!));
    } else {
      console.log("Пользователь не получен или не авторизован!");
    }
  }, [dispatch, userCurrent]);

  return (
    <>
      {statusUser === "loading" || statusUser === "idle" ? (
        <>
          <SkeletonUser />
          <SkeletonAward />
        </>
      ) : statusUser === "failed" ? (
        <>
          <div className="border-[1px] border-solid border-input bg-card flex gap-9 items-start p-4 rounded-lg]">
            <div className="flex flex-col gap-2 justify-center items-center ">
              <p className="font-normal text-2xl">{error} 😞</p>
            </div>
          </div>
          <div className="border-[1px] border-solid border-input bg-card flex flex-col gap-3 items-start p-4 rounded-lg">
            <div className="">
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
