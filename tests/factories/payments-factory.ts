/* eslint-disable quotes */
import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { Enrollment, Payment, Ticket, TicketStatus, TicketType } from '@prisma/client';
import { CardPaymentParams } from '@/services/payments-service';

export async function createPayment(ticketId: number, value: number) {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer: faker.name.findName(),
      cardLastDigits: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    },
  });
}

export function generateCreditCardData() {
  const futureDate = faker.date.future();

  return {
    issuer: faker.name.findName(),
    number: faker.datatype.number({ min: 100000000000000, max: 999999999999999 }).toString(),
    name: faker.name.findName(),
    expirationDate: `${futureDate.getMonth() + 1}/${futureDate.getFullYear()}`,
    cvv: faker.datatype.number({ min: 100, max: 999 }).toString(),
  };
}

export function findTickeyByIdReturn() {
  const expected: Ticket & { Enrollment: Enrollment } = {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status: TicketStatus.PAID,
    createdAt: new Date(),
    updatedAt: new Date(),
    Enrollment: {
      id: 1,
      name: 'Teste',
      cpf: '000.000.000-00',
      birthday: new Date(),
      phone: '90000-0000',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  return expected;
}

export function enrollmentByIdReturn() {
  const expected: Enrollment = {
    id: 1,
    name: 'John Doe',
    cpf: '12345678901',
    birthday: new Date(),
    phone: '123456789',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return expected;
}

export function findPaymentByTicketIdReturn() {
  const expected: Payment = {
    id: 1,
    ticketId: 1,
    value: 300,
    cardIssuer: '852336987412569',
    cardLastDigits: '2435',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return expected;
}

export function findTickeWithTypeById() {
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

export function cardPaymentParamsReturn() {
  const expected: CardPaymentParams = {
    issuer: '78946532131',
    number: 123,
    name: 'Teste',
    expirationDate: new Date(),
    cvv: 213,
  };

  return expected;
}
