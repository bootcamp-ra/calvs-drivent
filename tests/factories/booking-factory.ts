import faker from "@faker-js/faker";
import { Booking } from "@prisma/client";
import { prisma } from "@/config";

type CreateBookingParams = {
  roomId: number,
  userId: number,
}

export function createBooking({ roomId, userId }: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    }
  });
}

