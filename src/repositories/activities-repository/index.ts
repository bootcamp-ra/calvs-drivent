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

async function findActivitiesBookingCount(activitieId: number) {
  return prisma.activitiesBooking.count({
    where: {
      activitieId: activitieId,
    }
  });
}

const activitiesRepository = {
  findActivitiesDays,
  findActivitiesSpace,
  findActivities,
  findActivitiesBookingCount,
};

export default activitiesRepository;
