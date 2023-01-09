import { prisma } from "@/config";

async function findActivitiesDays() {
  return prisma.activitiesDate.findMany();
}

async function findActivitiesDayById(dateId: number) {
  return prisma.activitiesDate.findFirst({
    where: {
      id: dateId,
    }
  });
}

async function findActivitiesSpace() {
  return prisma.activitiesSpace.findMany();
}

async function findActivitiesSpaceById(spaceId: number) {
  return prisma.activitiesSpace.findFirst({
    where: {
      id: spaceId,
    }
  });
}

async function findActivities(dateId: number, spaceId: number) {
  return prisma.activities.findMany({
    where: {
      dateId: dateId,
      spaceId: spaceId,
    }
  });
}

async function findActivitiesBookingCount(activitieId: number) {
  return prisma.activitiesBooking.count({
    where: {
      activitieId: activitieId,
    }
  });
}

const activitiesRepository = {
  findActivitiesDays,
  findActivitiesDayById,
  findActivitiesSpace,
  findActivitiesSpaceById,
  findActivities,
  findActivitiesBookingCount,
};

export default activitiesRepository;
