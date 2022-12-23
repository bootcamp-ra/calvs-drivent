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
