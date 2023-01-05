import { prisma } from "@/config";

async function findById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    }
  });
}

const roomRepository = {
  findById
};

export default roomRepository;
