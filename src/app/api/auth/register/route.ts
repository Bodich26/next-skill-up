import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/components/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerification } from "@/lib/tokens";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { name, email, password, passwordConfirm, role } =
      await RegisterSchema.parse(data);

    if (!role || !name || !email || !password) {
      return NextResponse.json({
        error: "Not all necessary data has been transferred!",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email is already in use!" });
    }

    const existingName = await prisma.user.findUnique({
      where: { name },
    });

    if (existingName) {
      return NextResponse.json({ error: "Name is already in use!" });
    }

    const hashedPasswordUser = await bcrypt.hash(password, 10);

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

    const verificationToken = await generateVerification(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
