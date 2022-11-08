/*
  Warnings:

  - A unique constraint covering the columns `[enrollmentId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Address_enrollmentId_key" ON "Address"("enrollmentId");
