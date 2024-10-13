import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
  try {
    const listRewards = await prisma.reward.findMany();
    return NextResponse.json(listRewards);
  } catch (error) {
    console.error("Error fetching rewards:", error);
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  const { userId, rewardId } = await req.json();

  if (!userId || !rewardId) {
    console.error("Missing userId or rewardId");
    return NextResponse.json(
      { message: "Missing userId or rewardId" },
      { status: 400 }
    );
  }

  try {
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    const rewardExists = await prisma.reward.findUnique({
      where: { id: rewardId },
    });

    if (!userExists || !rewardExists) {
      return NextResponse.json(
        { message: "User or reward not found" },
        { status: 404 }
      );
    }

    const existingUserReward = await prisma.userReward.findUnique({
      where: {
        userId_rewardId: {
          userId: userId,
          rewardId: rewardId,
        },
      },
    });

    if (existingUserReward) {
      return NextResponse.json(
        { message: "User already has this reward" },
        { status: 409 }
      );
    }

    await prisma.userReward.create({
      data: {
        user: { connect: { id: userId } },
        reward: { connect: { id: rewardId } },
      },
    });

    const userWithAwards = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        awards: {
          include: {
            reward: true,
          },
        },
      },
    });

    const formattedAwards = userWithAwards?.awards.map((userReward) => ({
      rewardId: userReward.reward.id,
      name: userReward.reward.name,
      icon: userReward.reward.icon,
      description: userReward.reward.description,
      points: userReward.reward.points,
    }));

    return NextResponse.json(
      {
        user: {
          id: userWithAwards?.id,
          name: userWithAwards?.name,
          awards: formattedAwards,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating userReward:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
