-- CreateEnum
CREATE TYPE "Technology" AS ENUM ('HTML', 'CSS', 'JS', 'REACT', 'TS', 'NEXT', 'WEB', 'SECURITY');

-- CreateTable
CREATE TABLE "QuizItem" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "roles" "Role"[],
    "technology" "Technology" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAnswer" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "quizItemId" INTEGER NOT NULL,

    CONSTRAINT "QuizAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizItem_number_key" ON "QuizItem"("number");

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_quizItemId_fkey" FOREIGN KEY ("quizItemId") REFERENCES "QuizItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
