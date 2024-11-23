import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/components/auth";

export async function POST(req: NextRequest) {
  return postRegisterUser(req);
}

export async function postRegisterUser(req: NextRequest) {
  const data = await req.json();
  const { name, email, password, passwordConfirm, role } =
    await RegisterSchema.parse(data);

  if (!role || !name || !email || !password) {
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
      { error: "Email is already in use!" },
      { status: 400 }
    );
  }

  const hashedPasswordUser = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPasswordUser,
        role,
        rating: 0,
        studyTimes: 0,
        taskCompleted: 0,
        iconRating: "https://imgur.com/6v8ga6N.png",
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
