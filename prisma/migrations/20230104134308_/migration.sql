/*
  Warnings:

  - You are about to drop the column `day` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `vacancies` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "day",
DROP COLUMN "duration",
DROP COLUMN "time",
DROP COLUMN "vacancies",
ADD COLUMN     "endDate" DATE NOT NULL,
ADD COLUMN     "startDate" DATE NOT NULL;

-- CreateTable
CREATE TABLE "TicketActivity" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "TicketActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketActivity" ADD CONSTRAINT "TicketActivity_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TicketActivity" ADD CONSTRAINT "TicketActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
