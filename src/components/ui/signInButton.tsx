"use client";
import React from "react";
import { Button } from "./button";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IProps {}

export const SignInButton = ({}: IProps) => {
  const router = useRouter();
  return (
    <Button
      className={"mt-11 text-lg gap-x-2"}
      variant="outline"
      size="lg"
      onClick={() => router.push("/auth/login")}
    >
      <User size={24} />
      Вход
    </Button>
  );
};
