import { prisma } from "@/config";

async function findActivitiesDays() {
  return prisma.activitiesDate.findMany();
}

async function findActivitiesSpace() {
  return prisma.activitiesSpace.findMany();
}

async function findActivities(dateId: number, spaceId: number) {
  return prisma.activities.findMany({
    where: {
      dateId: dateId,
      spaceId: spaceId,
    }
  });
}

const activitiesRepository = {
  findActivitiesDays,
  findActivitiesSpace,
  findActivities,
};

export default activitiesRepository;
