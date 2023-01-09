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

async function findActivitieById(activitieId: number) {
  return prisma.activities.findFirst({
    where: {
      id: activitieId,
    }
  });
}

async function findActivitiesBookingByUser(ticketId: number) {
  return prisma.activitiesBooking.findMany({
    where: {
      ticketId: ticketId,
    },
    include: {
      Activities: true,
    }
  });  
}

async function createActivityBooking(ticketId: number, activitieId: number) {
  return prisma.activitiesBooking.create({
    data: {
      ticketId,
      activitieId,
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
  findActivitieById,
  findActivitiesBookingByUser,
  createActivityBooking,
};

export default activitiesRepository;
