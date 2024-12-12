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
    console.error("Error in POST /api/auth/reset:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return NextResponse.json({ success: "Reset Email" }, { status: 200 });
};
