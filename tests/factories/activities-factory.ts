import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createActivitiesDays() {
  return await prisma.activitiesDate.create({
    data: {
      weekday: faker.date.weekday(),
      date: faker.date.future(10),
    },
  });
}

export async function createActivitiesSpace() {
  return await prisma.activitiesSpace.create({
    data: {
      name: faker.locale,
    },
  });
}

export async function createActivitie(dateId: number, spaceId: number) {
  return await prisma.activities.create({
    data: {
      name: "Palestra A",
      capacity: Number(faker.random.numeric(2)),
      dateId: dateId,
      spaceId: spaceId,
      duration: Number(faker.random.numeric()),
      start: 9,
    },
  });
}

export async function createActivitieBooking(activitieId: number, ticketId: number) {
  return await prisma.activitiesBooking.create({
    data: {
      activitieId: activitieId,
      ticketId: ticketId,
    },
  });
}
