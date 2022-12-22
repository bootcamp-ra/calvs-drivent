import { prisma } from "@/config";

type CreateBookingParams = {
  roomId: number,
  userId: number,
  people: number
}

export function createBooking({ roomId, userId, people }: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
      people,
    }
  });
}

