"use server";
import * as z from "zod";
import { ResetSchema } from "@/components/auth";
import { prisma } from "../../../../../prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    return await reset(body);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}

export const reset = async (value: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(value);

  if (!validatedFields.success) {
    return NextResponse.json({ error: "Invalid email!" });
  }

  const { email } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "Email not found!" });
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return NextResponse.json({
    success: "Password Reset Email sent successfully.",
  });
};
