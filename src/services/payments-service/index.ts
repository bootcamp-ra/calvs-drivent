import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { Payment, prisma } from "@prisma/client";
import Stripe from "stripe";

//eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

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

async function paymentProcess(ticketId: number, userId: number, cardData: any, id: number) {
  await verifyTicketAndEnrollment(ticketId, userId);
  const ticket = await ticketRepository.findTickeWithTypeById(ticketId);

  const paymentData = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: (cardData.id? cardData.id.card.brand: cardData.issuer), 
    cardLastDigits: (cardData.id?  cardData.id.card.last4: cardData.number.toString().slice(-4)),
  };

  const payment = paymentRepository.createPayment(ticketId, paymentData);

  if(id) {
    const session = await stripe.paymentIntents.create({
      amount: ticket.TicketType.price,
      currency: "USD",
      description: "Ingresso",
      payment_method: id,
      confirm: true
    });
  }
  return (payment);
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
