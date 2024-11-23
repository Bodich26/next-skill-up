import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import bcrypt from "bcrypt";
import { LoginSchema } from "@/components/auth";

export async function POST(req: NextRequest) {
  return postLoginUser(req);
}

export async function postLoginUser(req: NextRequest) {
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

  if (existingUser) {
    return NextResponse.json(
      { error: "Email is already registered" },
      { status: 400 }
    );
  }

  const hashedPasswordUser = await bcrypt.hash(password, 10);

  try {
    return NextResponse.json(
      { message: "User login successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error login user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
