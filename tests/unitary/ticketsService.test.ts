/* eslint-disable quotes */
import { notFoundError } from '@/errors';
import { enrollmentWithAddressReturn, findTicketByEnrollmentIdReturn, getTicketTypeReturn } from '../factories';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import ticketService from '@/services/tickets-service';

describe('getTicketTypes function', () => {
  it('should get ticket types', async () => {
    const ticketTypes = getTicketTypeReturn();

    jest.spyOn(ticketRepository, 'findTicketTypes').mockResolvedValue(ticketTypes);

    const result = await ticketService.getTicketTypes();

    expect(result).toEqual(ticketTypes);
  });

  it('should not found ticket types', async () => {
    jest.spyOn(ticketRepository, 'findTicketTypes').mockResolvedValue(null);

    await expect(ticketService.getTicketTypes()).rejects.toEqual(notFoundError());
  });
});

describe('getTicketByUserId function', () => {
  it('should get hotels', async () => {
    const userId = 1;
    const ticket = findTicketByEnrollmentIdReturn();

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(ticket);

    const result = await ticketService.getTicketByUserId(userId);

    expect(result).toEqual(ticket);
  });

  it('should not found enrollment', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    await expect(ticketService.getTicketByUserId(userId)).rejects.toEqual(notFoundError());
  });

  it('should not found ticket', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(null);

    await expect(ticketService.getTicketByUserId(userId)).rejects.toEqual(notFoundError());
  });
});

describe('createTicket function', () => {
  it('should create ticket', async () => {
    const userId = 1;
    const ticketTypeId = 1;
    const enrollment = enrollmentWithAddressReturn();
    const ticket = findTicketByEnrollmentIdReturn();

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollment);

    jest.spyOn(ticketRepository, 'createTicket').mockResolvedValue(null);

    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(ticket);

    const result = await ticketService.createTicket(userId, ticketTypeId);

    expect(result).toEqual(ticket);
  });

  it('should not found enrollment', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    await expect(ticketService.getTicketByUserId(userId)).rejects.toEqual(notFoundError());
  });
});
