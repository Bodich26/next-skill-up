"use client";
import React from "react";
import { Button } from "./button";
import { User } from "lucide-react";

interface IProps {}

export const SignInButton = ({}: IProps) => {
  return (
    <Button className={"mt-11 text-lg gap-x-2"} variant="outline" size="lg">
      <User size={24} />
      Login
    </Button>
  );
};
