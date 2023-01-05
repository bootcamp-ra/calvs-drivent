import { prisma } from "@/config";

async function findActivitiesDays() {
  return prisma.activitiesDate.findMany();
}

const activitiesRepository = {
  findActivitiesDays,
};

export default activitiesRepository;
