/* eslint-disable quotes */
import bookingService from '../../src/services/booking-service';
import bookingRepository from '@/repositories/booking-repository';
import { cannotBookingError, notFoundError, unauthorizedError } from '@/errors';
import {
  cardPaymentParamsReturn,
  enrollmentByIdReturn,
  enrollmentWithAddressReturn,
  findBookingByRoomIdNoCapacityReturn,
  findBookingByRoomIdReturn,
  findPaymentByTicketIdReturn,
  findRoomByIdNoCapacityReturn,
  findRoomByIdReturn,
  findTickeWithTypeById,
  findTicketByEnrollmentIdReturn,
  findTickeyByIdReturn,
  getBookingDifferentUserIdReturn,
  getBookingReturn,
} from '../factories';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import roomRepository from '@/repositories/room-repository';
import paymentService from '@/services/payments-service';
import paymentRepository from '@/repositories/payment-repository';

describe('verifyTicketAndEnrollment function', () => {
  it('should return not found ticket error', async () => {
    const ticketId = 1;
    const userId = 1;

    jest.spyOn(ticketRepository, 'findTickeyById').mockResolvedValue(null);

    await expect(paymentService.verifyTicketAndEnrollment(ticketId, userId)).rejects.toEqual(notFoundError());
  });

  it('should return not found ticket error', async () => {
    const userId = 2;
    const ticket = findTickeyByIdReturn();
    const enrollment = enrollmentByIdReturn();

    jest.spyOn(ticketRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);

    await expect(paymentService.verifyTicketAndEnrollment(ticket.id, userId)).rejects.toEqual(unauthorizedError());
  });
});

describe('getPaymentByTicketId function', () => {
  it('should get payment by ticket id', async () => {
    const ticket = findTickeyByIdReturn();
    const enrollment = enrollmentByIdReturn();
    const payment = findPaymentByTicketIdReturn();

    jest.spyOn(ticketRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);
    jest.spyOn(paymentService, 'verifyTicketAndEnrollment').mockResolvedValue(null);
    jest.spyOn(paymentRepository, 'findPaymentByTicketId').mockResolvedValue(payment);

    const result = await paymentService.getPaymentByTicketId(enrollment.userId, ticket.id);

    expect(result).toEqual(payment);
  });
  it('should return not found payment error', async () => {
    const ticket = findTickeyByIdReturn();
    const enrollment = enrollmentByIdReturn();

    jest.spyOn(ticketRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);
    jest.spyOn(paymentService, 'verifyTicketAndEnrollment').mockResolvedValue(null);
    jest.spyOn(paymentRepository, 'findPaymentByTicketId').mockResolvedValue(null);

    await expect(paymentService.getPaymentByTicketId(enrollment.userId, ticket.id)).rejects.toEqual(notFoundError());
  });
});

describe('paymentProcess function', () => {
  it('should process payment', async () => {
    const ticket = findTickeyByIdReturn();
    const ticketType = findTickeWithTypeById();
    const enrollment = enrollmentByIdReturn();
    const payment = findPaymentByTicketIdReturn();
    const cardParams = cardPaymentParamsReturn();

    jest.spyOn(ticketRepository, 'findTickeyById').mockResolvedValue(ticket);
    jest.spyOn(enrollmentRepository, 'findById').mockResolvedValue(enrollment);
    jest.spyOn(paymentService, 'verifyTicketAndEnrollment').mockResolvedValue(null);

    jest.spyOn(ticketRepository, 'findTickeWithTypeById').mockResolvedValue(ticketType);
    jest.spyOn(paymentRepository, 'createPayment').mockResolvedValue(payment);
    jest.spyOn(ticketRepository, 'ticketProcessPayment').mockResolvedValue(null);

    const result = await paymentService.paymentProcess(enrollment.userId, ticket.id, cardParams);

    expect(result).toEqual(payment);
  });
});
