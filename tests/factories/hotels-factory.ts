/* eslint-disable quotes */
import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { Hotel, Room, Ticket, TicketStatus, TicketType } from '@prisma/client';

//Sabe criar objetos - Hotel do banco
export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoomWithHotelId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: '1020',
      capacity: 3,
      hotelId: hotelId,
    },
  });
}

export function findTicketFailByEnrollmentIdReturn() {
  const expected: Ticket & { TicketType: TicketType } = {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status: TicketStatus.RESERVED,
    createdAt: new Date(),
    updatedAt: new Date(),
    TicketType: {
      id: 1,
      name: 'Teste',
      price: 300,
      isRemote: true,
      includesHotel: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  return expected;
}

export function getHotelsMock() {
  const expect: Hotel[] = [
    {
      id: 1,
      name: 'Teste',
      image: 'teste image',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return expect;
}

export function getRoomsByHotelIdMock() {
  const expect: Hotel & { Rooms: Room[] } = {
    id: 1,
    name: 'Teste',
    image: 'teste image',
    createdAt: new Date(),
    updatedAt: new Date(),
    Rooms: [
      {
        id: 1,
        name: 'Teste',
        capacity: 1,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  return expect;
}
