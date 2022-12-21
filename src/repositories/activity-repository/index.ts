import { prisma } from "@/config";

async function findByTicketTypeId(ticketTypeId: number) {
  return prisma.activity.findMany({
    where: {
      ticketTypeId,
    },
    include: {
      TicketType: true,
    }
  });
}

const activityRepository = {
  findByTicketTypeId
};

export default activityRepository;
