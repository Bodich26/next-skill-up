import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  return getTasksArray();
}

export async function POST(req: Request) {
  return postNewTaskToUser(req);
}

export async function getTasksArray() {
  try {
    const tasksList = await prisma.task.findMany();
    return NextResponse.json(tasksList);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.error();
  }
}

export async function postNewTaskToUser(req: Request) {
  const { userId, name, difficulty } = await req.json();

  if (!userId || !name || !difficulty) {
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        idTask: uuidv4(),
        name,
        difficulty,
        points: calculatePoints(difficulty),
        completed: false,
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.error();
  }
}

const getRandomPoints = (range: [number, number]): number => {
  const [min, max] = range;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const calculatePoints = (difficulty: string): number => {
  const pointsMapping: Record<string, [number, number]> = {
    "Easy layout": [420, 515],
    "Medium layout": [616, 760],
    "Hard layout": [780, 922],
    "Easy App": [1140, 1460],
    "Medium App": [1550, 1890],
    "Hard App": [2100, 2830],
    "Learning info": [430, 620],
  };

  const range = pointsMapping[difficulty];
  return range ? getRandomPoints(range) : 0;
};
