/*
  Warnings:

  - You are about to drop the column `dateSpaceTimeId` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the `ActivitiesTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DateSpaceTime` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateId` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spaceId` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activities" DROP CONSTRAINT "Activities_dateSpaceTimeId_fkey";

-- DropForeignKey
ALTER TABLE "DateSpaceTime" DROP CONSTRAINT "DateSpaceTime_dateId_fkey";

-- DropForeignKey
ALTER TABLE "DateSpaceTime" DROP CONSTRAINT "DateSpaceTime_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "DateSpaceTime" DROP CONSTRAINT "DateSpaceTime_timeId_fkey";

-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "dateSpaceTimeId",
ADD COLUMN     "dateId" INTEGER NOT NULL,
ADD COLUMN     "spaceId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ActivitiesTime";

-- DropTable
DROP TABLE "DateSpaceTime";

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "ActivitiesDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "ActivitiesSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
