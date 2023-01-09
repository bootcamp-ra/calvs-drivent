
import { notFoundError, requestError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";
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

async function bookActivity(userId: number, activitieId: number) {
  await hotelService.listHotels(userId);
  const ticket = await ticketService.getTicketByUserId(userId);

  if(activitieId < 1) throw requestError(400, "Bad request");
  //activity exists and resolve hour conflicts 

  await activitiesRepository.createActivityBooking(ticket.id, activitieId);
  return;
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
