"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { UserType } from "@/type/user";
import { Api } from "../../../services/api-client";
import { SkeletonUser } from "./skeletonUser";

export default function DisplayUser() {
  const [userId, setUserId] = React.useState<number>(1);
  const [user, setUser] = React.useState<UserType | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  useEffect(() => {
    const fetchUser = async (id: number) => {
      try {
        setLoading(true);
        setError(false);
        setErrorMessage("");
        const userData = await Api.users.user(id);
        setUser(userData);
      } catch (error: any) {
        setError(true);
        setErrorMessage(error.message);
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  return (
    <>
      {loading ? (
        <SkeletonUser />
      ) : (
        <div className="space-y-4">
          {error ? (
            <div className="border-[1px] border-solid border-input bg-card flex gap-9 justify-center items-center p-4 rounded-lg min-h-[258px]">
              <div>
                <p className="font-medium text-3xl mb-2">
                  Something went wrong 😞
                </p>
                <span>{errorMessage}</span>
              </div>
            </div>
          ) : (
            <div className="border-[1px] border-solid border-input bg-card flex gap-9 items-start p-4 rounded-lg min-h-[258px]">
              <Image
                src={user?.iconRating || ""}
                width={223}
                height={224}
                alt="Rating"
              />
              <div className="flex flex-col gap-2 ">
                <h3 className="font-bold text-3xl">{user?.name}</h3>
                <dl className="flex gap-2">
                  <dt>Personal rating:</dt>
                  <dd className="font-bold text-base">{user?.rating}</dd>
                </dl>
                <dl className="flex gap-2">
                  <dt>Study time:</dt>
                  <dd className="font-bold text-base">{user?.studyTimes}</dd>
                </dl>
                <dl className="flex gap-2">
                  <dt>Tasks completed:</dt>
                  <dd className="font-bold text-base">{user?.taskCompleted}</dd>
                </dl>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
