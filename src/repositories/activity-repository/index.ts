import { prisma, redisClient } from "@/config";

async function findByTicketTypeId(ticketTypeId: number) {
  return prisma.activity.findMany({
    where: {
      ticketTypeId,
    },
    include: {
      TicketType: true,
      TicketActivity: true,
    },
    orderBy: [
      {
        startDate: "asc",
      }
    ]
  });
}

async function getActivitiesRedis(ticketTypeId: number) {
  return redisClient.get(`activities${ticketTypeId.toString()}`) as any;
}

async function setActivitiesRedis(activities: any, ticketTypeId: number) {
  await redisClient.set(`activities${ticketTypeId.toString()}`, JSON.stringify(activities));
}

async function getActivityById(activityId: number) {
  return prisma.activity.findFirst({
    where: {
      id: activityId,
    }
  });
}

async function postTicketActivity(ticketId: number, activityId: number) {
  return prisma.ticketActivity.create({
    data: {
      ticketId,
      activityId
    }
  });
}

async function deleteRedisActivities(ticketTypeId: number) {
  await redisClient.del(`activities${ticketTypeId.toString()}`);
}

async function getTicketActivity(ticketId: number, activityId: number) {
  return prisma.ticketActivity.findFirst({
    where: {
      ticketId,
      activityId
    }
  });
}

async function getTicketsActivitiesByTicketId(ticketId: number) {
  return prisma.ticketActivity.findMany({
    where: {
      ticketId
    },
    include: {
      Activity: true
    }
  });
}

const activityRepository = {
  findByTicketTypeId, postTicketActivity, getTicketActivity, getTicketsActivitiesByTicketId, getActivityById,
  setActivitiesRedis, getActivitiesRedis, deleteRedisActivities
};

export default activityRepository;
