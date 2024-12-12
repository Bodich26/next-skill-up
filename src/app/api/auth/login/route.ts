import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/components/auth";
import { signIn } from "../../../../../auth";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "../../../../../route";
import { generateVerification, generateTwoFactorToken } from "@/lib/tokens";
import { z } from "zod";

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

export const postLoginUser = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid fields!" }, { status: 400 });
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Email not registered" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser!.password
    );
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Wrong password." }, { status: 401 });
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerification(existingUser.email);

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return NextResponse.json(
        { success: "Confirmation email sent!", verificationToken },
        { status: 200 }
      );
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await prisma.twoFactorToken.findFirst({
          where: { email: existingUser.email },
        });

        if (!twoFactorToken) {
          return NextResponse.json({ error: "Invalid code!" }, { status: 405 });
        }

        if (twoFactorToken.token !== code) {
          return NextResponse.json({ error: "Invalid code!" }, { status: 406 });
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return NextResponse.json({ error: "Code expired!" }, { status: 407 });
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
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );

        return NextResponse.json({ twoFactor: true }, { status: 200 });
      }
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
          );
        default:
          return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
          );
      }
    }
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
