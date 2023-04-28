/* eslint-disable quotes */
import faker from '@faker-js/faker';
import { Address, Booking, Enrollment, Room, Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

type CreateBookingParams = {
  roomId: number;
  userId: number;
};

export function createBooking({ roomId, userId }: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

export function getBookingReturn() {
  const booking: Booking & { Room: Room } = {
    id: 1,
    userId: 1,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    Room: {
      id: 1,
      name: 'Room 1',
      capacity: 2,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  return booking;
}

export function getBookingDifferentUserIdReturn() {
  const booking: Booking & { Room: Room } = {
    id: 1,
    userId: 2,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    Room: {
      id: 1,
      name: 'Room 1',
      capacity: 2,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  return booking;
}

export function findTicketByEnrollmentIdReturn() {
  const expected: Ticket & { TicketType: TicketType } = {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status: TicketStatus.PAID,
    createdAt: new Date(),
    updatedAt: new Date(),
    TicketType: {
      id: 1,
      name: 'Teste',
      price: 300,
      isRemote: false,
      includesHotel: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  return expected;
}

export function enrollmentWithAddressReturn() {
  const expected: Enrollment & { Address: Address[] } = {
    id: 1,
    name: 'John Doe',
    cpf: '12345678901',
    birthday: new Date(),
    phone: '123456789',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    Address: [
      {
        id: 1,
        cep: '12345678',
        street: 'Main Street',
        city: 'New York',
        state: 'NY',
        number: '123',
        neighborhood: 'Downtown',
        addressDetail: 'Apartment 456',
        enrollmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  return expected;
}

export function findRoomByIdReturn() {
  const expected: Room = {
    id: 1,
    name: 'Teste',
    capacity: 2,
    hotelId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return expected;
}

export function findBookingByRoomIdReturn() {
  const expected: (Booking & { Room: Room })[] = [
    {
      id: 1,
      userId: 1,
      roomId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      Room: {
        id: 1,
        name: 'Teste',
        capacity: 2,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ];

  return expected;
}

export function findBookingByRoomIdNoCapacityReturn() {
  const expected: (Booking & { Room: Room })[] = [
    {
      id: 1,
      userId: 1,
      roomId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      Room: {
        id: 1,
        name: 'Teste',
        capacity: 1,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  ];

  return expected;
}

export function findRoomByIdNoCapacityReturn() {
  const expected: Room = {
    id: 1,
    name: 'Teste',
    capacity: 1,
    hotelId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return expected;
}
