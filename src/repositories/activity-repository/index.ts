import { prisma } from "@/config";

async function findByTicketTypeId(ticketTypeId: number) {
  return prisma.activity.findMany({
    where: {
      ticketTypeId,
    },
    include: {
      TicketType: true,
    },
    orderBy: [
      {
        time: "asc",
      }
    ]
  });
}

const activityRepository = {
  findByTicketTypeId
};

export default activityRepository;
