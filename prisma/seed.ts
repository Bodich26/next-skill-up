import { quizQuestions } from "./constants";
import { prisma } from "./prisma-client";

async function up() {
  for (const question of quizQuestions) {
    const createQuizItem = await prisma.quizItem.create({
      data: {
        number: question.number,
        description: question.description,
        roles: question.roles,
        technology: question.technology,
        optional: {
          create: question.optional?.create,
        },
      },
    });
  }
}

async function main() {
  try {
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
