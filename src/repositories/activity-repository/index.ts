import { prisma } from "@/config";

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
  findByTicketTypeId, postTicketActivity, getTicketActivity, getTicketsActivitiesByTicketId, getActivityById
};

export default activityRepository;
