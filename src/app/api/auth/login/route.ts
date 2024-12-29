"use server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/components/auth";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "../../../../../routes";
import { generateVerification, generateTwoFactorToken } from "@/lib/tokens";
import { signIn } from "../../../../../auth";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedFields = LoginSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json({ error: "Неверные поля!" });
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return NextResponse.json({
      error: "Почта не зарегистрирована!",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Неверный пароль!" });
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerification(existingUser.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json({
      success: "Письмо с подтверждением отправлено!",
      verificationToken,
    });
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await prisma.twoFactorToken.findFirst({
        where: { email: existingUser.email },
      });

      if (!twoFactorToken) {
        return NextResponse.json({ error: "Неверный код!" });
      }

      if (twoFactorToken.token !== code) {
        return NextResponse.json({ error: "Неверный код!" });
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return NextResponse.json({ error: "Срок действия кода истек!" });
      }

      await prisma.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation =
        await prisma.twoFactorConfirmation.findUnique({
          where: { userId: existingUser.id },
        });

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return NextResponse.json({
        success: true,
        twoFactor: true,
        message: "Проверьте почту и введите код двухфакторной аутентификации.",
      });
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return NextResponse.json({ success: true, message: "Успешный вход!" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json({ error: "Неверные учетные данные!" });
        default:
          return NextResponse.json({ error: "Неизвестная ошибка 😢" });
      }
    }
    throw error;
    // return NextResponse.json({ error: "Internal server error" });
  }
}
