import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (id) {
    const userId = Number(id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  }
  return NextResponse.json({ message: "User ID is required" }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const user = await prisma.user.create({
    data,
  });

  return NextResponse.json(user);
}
