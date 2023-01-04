import { prisma } from "@/config";

async function findActivitiesDays() {
  return prisma.activitiesDate.findMany();
}

async function findActivitiesSpace() {
  return prisma.activitiesSpace.findMany();
}

const activitiesRepository = {
  findActivitiesDays,
  findActivitiesSpace,
};

export default activitiesRepository;
