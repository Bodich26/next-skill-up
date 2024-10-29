import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  return getTasksArray();
}

export async function POST(req: Request) {
  return postNewTaskToUser(req);
}

export async function PATCH(req: Request) {
  return completeUserTask(req);
}

export async function DELETE(req: Request) {
  return deleteUserTask(req);
}

export async function getTasksArray() {
  try {
    const tasksList = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
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

export async function deleteUserTask(req: Request) {
  try {
    const { idTask } = await req.json();

    if (!idTask) {
      return NextResponse.json({ message: "Missing idTask" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({
      where: { idTask },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await prisma.task.delete({
      where: { idTask },
    });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.error();
  }
}

export async function completeUserTask(req: Request) {
  try {
    const { idTask, completed } = await req.json();

    if (!idTask || completed === undefined) {
      return NextResponse.json({ message: "Missing idTask" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({
      where: { idTask },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await prisma.task.update({
      where: { idTask },
      data: {
        completed: true,
      },
    });

    const userId = task.userId;
    await prisma.user.update({
      where: { id: userId },
      data: {
        rating: {
          increment: task.points,
        },
        taskCompleted: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ message: "Task completed successfully" });
  } catch (error) {
    console.error("Error completed task:", error);
    return NextResponse.error();
  }
}
