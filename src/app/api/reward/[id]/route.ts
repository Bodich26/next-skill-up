import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const rewardId = parseInt(params.id);

  try {
    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
    });

    if (!reward) {
      return NextResponse.json(
        { message: "Reward not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(reward);
  } catch (error) {
    return NextResponse.error();
  }
}
