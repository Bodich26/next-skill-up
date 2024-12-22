import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const user = await prisma.user.create({
    data,
  });

  return NextResponse.json(user);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        awards: {
          include: {
            reward: {
              select: {
                id: true,
                name: true,
                icon: true,
                description: true,
                points: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userWithAwards = {
      ...user,
      awards: user.awards.map((userReward) => userReward.reward),
    };
    return NextResponse.json(userWithAwards);
  }
  return NextResponse.json({ message: "User ID is required" }, { status: 400 });
}
