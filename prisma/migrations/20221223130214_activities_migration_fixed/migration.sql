/*
  Warnings:

  - Added the required column `weekday` to the `ActivitiesDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivitiesDate" ADD COLUMN     "weekday" TEXT NOT NULL;
