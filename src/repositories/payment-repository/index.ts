import { prisma } from "@/config";
import { Payment } from "@prisma/client";
import { TicketStatus } from "@prisma/client";

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    }
  });
}

async function createPayment(ticketId: number, params: PaymentParams) {
  const payment = prisma.payment.create({
    data: {
      ticketId,
      ...params,
    }
  });

  const update = prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    }
  });

  try{
    await prisma.$transaction([payment, update]);
    return payment;
  } catch (error) {
    return ( error );
  }
}

export type PaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">

const paymentRepository = {
  findPaymentByTicketId,
  createPayment,
};

export default paymentRepository;
