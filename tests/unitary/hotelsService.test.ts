/* eslint-disable quotes */
import hotelsService from '../../src/services/hotels-service';
import { notFoundError } from '@/errors';
import {
  enrollmentWithAddressReturn,
  findTicketByEnrollmentIdReturn,
  findTicketFailByEnrollmentIdReturn,
  getHotelsMock,
  getRoomsByHotelIdMock,
} from '../factories';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import hotelRepository from '@/repositories/hotel-repository';

describe('listHotels function', () => {
  it('should return not found error', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    await expect(hotelsService.listHotels(userId)).rejects.toEqual(notFoundError());
  });

  it('should return cannot list hotels error with ticket null', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(null);

    await expect(hotelsService.listHotels(userId)).rejects.toEqual(cannotListHotelsError());
  });

  it('should return cannot list hotels error with ticket status reserved', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketFailByEnrollmentIdReturn());

    await expect(hotelsService.listHotels(userId)).rejects.toEqual(cannotListHotelsError());
  });

  it('should return cannot list hotels error with ticket type is remote', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketFailByEnrollmentIdReturn());

    await expect(hotelsService.listHotels(userId)).rejects.toEqual(cannotListHotelsError());
  });

  it('should return cannot list hotels error with ticket type not includes hotel', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketFailByEnrollmentIdReturn());

    await expect(hotelsService.listHotels(userId)).rejects.toEqual(cannotListHotelsError());
  });
});

describe('getHotels function', () => {
  it('should get hotels', async () => {
    const userId = 1;
    const hotels = getHotelsMock();

    jest.spyOn(hotelsService, 'listHotels').mockResolvedValue(null);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketByEnrollmentIdReturn());

    jest.spyOn(hotelRepository, 'findHotels').mockResolvedValue(hotels);

    const result = await hotelsService.getHotels(userId);

    expect(result).toEqual(hotels);
  });
});

describe('getHotelsWithRooms function', () => {
  it('should get hotel with room', async () => {
    const userId = 1;
    const hotelId = 1;
    const hotel = getRoomsByHotelIdMock();

    jest.spyOn(hotelsService, 'listHotels').mockResolvedValue(null);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketByEnrollmentIdReturn());

    jest.spyOn(hotelRepository, 'findRoomsByHotelId').mockResolvedValue(hotel);

    const result = await hotelsService.getHotelsWithRooms(userId, hotelId);

    expect(result).toEqual(hotel);
  });

  it('should not found hotel with room', async () => {
    const userId = 1;
    const hotelId = 1;

    jest.spyOn(hotelsService, 'listHotels').mockResolvedValue(null);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketByEnrollmentIdReturn());

    jest.spyOn(hotelRepository, 'findRoomsByHotelId').mockResolvedValue(null);

    await expect(hotelsService.getHotelsWithRooms(userId, hotelId)).rejects.toEqual(notFoundError());
  });
});
