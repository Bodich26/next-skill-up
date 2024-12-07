"use client";
import { FormLogin, FormRegister } from "@/components/auth";
import React from "react";

export default function Login() {
  const [switchForm, setSwitchForm] = React.useState<boolean>(true);
  return (
    <>
      {switchForm ? (
        <FormLogin switchForm={() => setSwitchForm(false)} />
      ) : (
        <FormRegister switchForm={() => setSwitchForm(true)} />
      )}
    </>
  );
}
