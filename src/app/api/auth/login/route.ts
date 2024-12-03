import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/components/auth";
import { signIn } from "../../../../../auth";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "../../../../../route";
import { generateVerification } from "@/lib/tokens";

export async function POST(req: NextRequest) {
  return postLoginUser(req);
}

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

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export async function postLoginUser(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, password } = await LoginSchema.parse(data);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Not all necessary data has been transferred!" },
        { status: 400 }
      );
    }

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

    const result = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    if (!result) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", result },
      { status: 200 }
    );
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
}
