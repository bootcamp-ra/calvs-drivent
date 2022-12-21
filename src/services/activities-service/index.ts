import { notFoundError } from "@/errors";
import activityRepository from "@/repositories/activity-repository";

async function getActivities(ticketTypeId: number) {
  const activities = await activityRepository.findByTicketTypeId(ticketTypeId);
  if (!activities) {
    throw notFoundError();
  }

  return activities;
}

const activityService = { getActivities };

export default activityService;
