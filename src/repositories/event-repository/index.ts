import { prisma } from "@/config";

async function findFirst() {
  return prisma.event.findFirst();
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
