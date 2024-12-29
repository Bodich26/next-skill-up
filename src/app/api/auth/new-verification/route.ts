import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: "Требуется токен!" });
    }

    return await newVerification(token);
  } catch (error) {
    return NextResponse.json({ error: "Внутренняя ошибка сервера 🤖" });
  }
}

export const newVerification = async (token: string) => {
  const existingToken = await prisma.verificationToken.findUnique({
    where: { token: token },
  });
  if (!existingToken) {
    return NextResponse.json({ error: "Токен не существует!" });
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

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      isTwoFactorEnabled: true,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return NextResponse.json({ success: "Почта подтверждена!" });
};
