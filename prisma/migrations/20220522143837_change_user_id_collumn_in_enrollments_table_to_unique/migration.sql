/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_key" ON "Enrollment"("userId");
