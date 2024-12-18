import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/components/auth/schemas";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    return await newPassword(data.values, data.token);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return NextResponse.json({ error: "Missing token!" });
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return NextResponse.json({ error: "Invalid fields!" });
  }

  const { password } = validatedFields.data;

  const existingToken = await prisma.passwordResetToken.findUnique({
    where: { token: token },
  });
  console.log("Token in database query:", token);
  console.log("Existing token from database:", existingToken);

  if (!existingToken) {
    return NextResponse.json({ error: "Invalid token!" });
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return NextResponse.json({ error: "Token has expired!" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.email },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "Email does not exist!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return NextResponse.json({ success: "Password updated!" });
};
