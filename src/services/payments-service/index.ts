import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function verifyTicketAndEnrollment(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTickeyById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);

  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

async function getPaymentByTicketId(userId: number, ticketId: number) {
  await verifyTicketAndEnrollment(ticketId, userId);

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);

  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function paymentProcess(ticketId: number, userId: number, cardData: CardPaymentParams) {
  await verifyTicketAndEnrollment(ticketId, userId);

  const ticket = await ticketRepository.findTickeWithTypeById(ticketId);

  const paymentData = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.createPayment(ticketId, paymentData);

  await ticketRepository.ticketProcessPayment(ticketId);

  return payment;
}

export type CardPaymentParams = {
  issuer: string,
  number: number,
  name: string,
  expirationDate: Date,
  cvv: number
}

const paymentService = {
  getPaymentByTicketId,
  paymentProcess,
};

export default paymentService;
