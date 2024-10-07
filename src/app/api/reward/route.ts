import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
  try {
    const listRewards = await prisma.reward.findMany();
    return NextResponse.json(listRewards);
  } catch (error) {
    return NextResponse.error();
  }
}
