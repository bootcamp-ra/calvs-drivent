
import { conflictError, notFoundError, requestError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";
import { Activities, ActivitiesBooking } from "@prisma/client";
import hotelService from "../hotels-service";
import ticketService from "../tickets-service";

async function getActivitiesDays() {
  const activitiesDays = await activitiesRepository.findActivitiesDays();

  if (!activitiesDays) {
    throw notFoundError();
  }
  return activitiesDays;
}

async function getActivitiesDayById(dateId: number) {
  const activitiesDay = await activitiesRepository.findActivitiesDayById(dateId);
  return activitiesDay;
}

async function getActivitiesSpace() {
  const activitiesSpace = await activitiesRepository.findActivitiesSpace();

  if (!activitiesSpace) {
    throw notFoundError();
  }
  return activitiesSpace;
}

async function getActivitiesSpaceById(spaceId: number) {
  const activitiesSpace = await activitiesRepository.findActivitiesSpaceById(spaceId);
  return activitiesSpace;
}

async function getActivities(dateId: number, spaceId: number) {
  const activities = await activitiesRepository.findActivities(dateId, spaceId);

  if (!activities) {
    throw notFoundError();
  }
  return activities;
}

async function getActivitiesBookingCounting(activitieId: number) {
  const activitiesBooking = await activitiesRepository.findActivitiesBookingCount(activitieId);

  if (!activitiesBooking) {
    throw notFoundError();
  }
  return activitiesBooking;
}

function activitieConflict(activitie: Activities, userBooking: (ActivitiesBooking & { Activities: Activities; })[] ) {
  for(let i=0; i<userBooking.length; i++) {
    if(userBooking[i].Activities.dateId === activitie.dateId) {
      if(activitie.start >= userBooking[i].Activities.start && activitie.start < userBooking[i].Activities.start + userBooking[i].Activities.duration) {
        return true;
      } else if(activitie.start < userBooking[i].Activities.start && activitie.start + activitie.duration > userBooking[i].Activities.start) {
        return true;
      }
    }
  }
  return false;
}

async function bookActivity(userId: number, activitieId: number) {
  await hotelService.listHotels(userId);
  const ticket = await ticketService.getTicketByUserId(userId);

  if(activitieId < 1 || isNaN(activitieId)) throw requestError(400, "Bad request");

  const activitie = await activitiesRepository.findActivitieById(activitieId);
  if(!activitie) throw notFoundError();

  const userBooking = await activitiesRepository.findActivitiesBookingByUser(ticket.id);
  if(activitieConflict(activitie, userBooking)) throw conflictError("Booking not allowed");

  const booking = await activitiesRepository.createActivityBooking(ticket.id, activitieId);
  return booking;
}

const activitiesService = {
  getActivitiesDays,
  getActivitiesDayById,
  getActivitiesSpace,
  getActivitiesSpaceById,
  getActivities,
  getActivitiesBookingCounting,
  bookActivity,
};

export default activitiesService;
