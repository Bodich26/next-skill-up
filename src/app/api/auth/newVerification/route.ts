"use server";

import { NextResponse } from "next/server";
import { getVerificationTokenByToken } from "../login/route";
import { prisma } from "../../../../../prisma/prisma-client";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return NextResponse.json(
      { error: "Token does not exist!" },
      { status: 400 }
    );
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return NextResponse.json({ error: "Token has expired!" }, { status: 401 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.email },
  });
  if (!existingUser) {
    return NextResponse.json(
      { error: "Email does not exist!" },
      { status: 402 }
    );
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return NextResponse.json({ success: "Email verified" }, { status: 200 });
};
