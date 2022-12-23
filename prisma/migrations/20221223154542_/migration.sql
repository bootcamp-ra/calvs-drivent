-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "place" VARCHAR(200) NOT NULL,
    "day" DATE NOT NULL,
    "time" TIME(6) NOT NULL,
    "duration" TIME(6) NOT NULL,
    "ticketTypeId" INTEGER NOT NULL,
    "vacancies" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "TicketType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
