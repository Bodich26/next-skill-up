import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { QuizItemWithAnswers } from "@/type";

export async function GET() {
  return getQuizItems();
}

export const getQuizItems = async () => {
  try {
    const quizItems = await prisma.quizItem.findMany({
      include: {
        optional: true,
      },
    });

    return NextResponse.json(quizItems as QuizItemWithAnswers[]);
  } catch (error) {
    console.error("Ошибка при получении Квизов - Api Route:", error);
    return NextResponse.error();
  }
};
