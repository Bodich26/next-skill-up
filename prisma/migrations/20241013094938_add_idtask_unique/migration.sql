/*
  Warnings:

  - A unique constraint covering the columns `[idTask]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_idTask_key" ON "Task"("idTask");
