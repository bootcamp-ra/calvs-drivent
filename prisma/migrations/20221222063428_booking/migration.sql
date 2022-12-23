-- CreateTable
CREATE TABLE "ActivitiesDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivitiesDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitiesSpace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivitiesSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitiesTime" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivitiesTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateSpaceTime" (
    "id" SERIAL NOT NULL,
    "dateId" INTEGER NOT NULL,
    "spaceId" INTEGER NOT NULL,
    "timeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DateSpaceTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateSpaceTimeId" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitiesBooking" (
    "id" SERIAL NOT NULL,
    "activitieId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivitiesBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivitiesDate_date_key" ON "ActivitiesDate"("date");

-- CreateIndex
CREATE UNIQUE INDEX "ActivitiesSpace_name_key" ON "ActivitiesSpace"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ActivitiesTime_date_key" ON "ActivitiesTime"("date");

-- AddForeignKey
ALTER TABLE "DateSpaceTime" ADD CONSTRAINT "DateSpaceTime_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "ActivitiesDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateSpaceTime" ADD CONSTRAINT "DateSpaceTime_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "ActivitiesSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateSpaceTime" ADD CONSTRAINT "DateSpaceTime_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "ActivitiesTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_dateSpaceTimeId_fkey" FOREIGN KEY ("dateSpaceTimeId") REFERENCES "DateSpaceTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivitiesBooking" ADD CONSTRAINT "ActivitiesBooking_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivitiesBooking" ADD CONSTRAINT "ActivitiesBooking_activitieId_fkey" FOREIGN KEY ("activitieId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
