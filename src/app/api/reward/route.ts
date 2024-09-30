import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
  const reward = await prisma.reward.findMany();

  return NextResponse.json(reward);
}
