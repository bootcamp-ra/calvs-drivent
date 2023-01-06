import { notFoundError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";

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

const activitiesService = {
  getActivitiesDays,
  getActivitiesDayById,
  getActivitiesSpace,
  getActivitiesSpaceById,
  getActivities,
  getActivitiesBookingCounting,
};

export default activitiesService;
