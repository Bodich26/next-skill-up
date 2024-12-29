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
    return NextResponse.json({ error: "Внутренняя ошибка сервера 🤖" });
  }
}

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return NextResponse.json({ error: "Отсутствует токен!" });
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return NextResponse.json({ error: "Неверные поля!" });
  }

  const { password } = validatedFields.data;

  const existingToken = await prisma.passwordResetToken.findUnique({
    where: { token: token },
  });

  if (!existingToken) {
    return NextResponse.json({ error: "Неверный токен!" });
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return NextResponse.json({ error: "Срок действия токена истек!" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.email },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "Почта не существует!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return NextResponse.json({ success: "Пароль обновлен!" });
};
