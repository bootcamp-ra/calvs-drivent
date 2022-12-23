import { prisma } from "@/config";
import e from "express";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotelsWithRoomsAndBookings() {
  return prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      Rooms: {
        select: {
          id: true,
          name: true,
          capacity: true,
          Booking: true,
        },
      },
    },
  });
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  findHotelsWithRoomsAndBookings,
};

export default hotelRepository;
