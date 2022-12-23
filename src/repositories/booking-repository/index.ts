import { prisma } from "@/config";
import { Booking } from "@prisma/client";

type CreateParams = Omit<Booking, "id" | "createdAt" | "updatedAt">;
type UpdateParams = Omit<Booking, "createdAt" | "updatedAt">;

async function create({ roomId, userId, people }: CreateParams): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
      people,
    }
  });
}

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    }
  });
}

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    }
  });
}

async function upsertBooking({ id, roomId, userId, people }: UpdateParams) {
  return prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
      people,
    },
    update: {
      roomId,
    }
  });
}

async function countBookings(hotelId: number) {
  return prisma.booking.count({
    where: {
      Room: {
        hotelId
      }
    }
  });
}

const bookingRepository = {
  create,
  findByRoomId,
  findByUserId,
  upsertBooking,
  countBookings,
};

export default bookingRepository;
