"use server";
import * as z from "zod";
import { ResetSchema } from "@/components/auth";
import { prisma } from "../../../../../prisma/prisma-client";
import { NextResponse } from "next/server";

export const reset = async (value: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(value);

  if (!validatedFields.success) {
    return NextResponse.json({ error: "Invalid email!" }, { status: 400 });
  }

  const { email } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "Email not found!" }, { status: 401 });
  }

  return NextResponse.json({ success: "Reset Email" }, { status: 200 });
};
