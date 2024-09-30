import { rewards } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

async function up() {
  await prisma.user.createMany({
    data: [
      {
        name: "Bodich",
        email: "test@gmail.com",
        password: hashSync("123456", 10),
        role: "FRONT_END",
        rating: 0,
        studyTimes: 0,
        taskCompleted: 0,
        iconRating: "https://imgur.com/6v8ga6N.png",
      },
    ],
  });

  await prisma.reward.createMany({
    data: rewards,
  });
}
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}
async function main() {
  try {
    await down();
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
