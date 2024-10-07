import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (id) {
    const reward = await prisma.reward.findUnique({
      where: { id: Number(id) },
    });

    if (!reward) {
      return NextResponse.json(
        { message: "reward not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(reward);
  }
  return NextResponse.json(
    { message: "reward ID is required" },
    { status: 400 }
  );
}
