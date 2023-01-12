import { notFoundError, invalidDataError } from "@/errors";
import activityRepository from "@/repositories/activity-repository";

async function getActivities(ticketTypeId: number) {
  let activities = await activityRepository.getActivitiesRedis(ticketTypeId);
  if(!activities) {
    activities = await activityRepository.findByTicketTypeId(ticketTypeId);
    if (!activities) throw notFoundError();
    await activityRepository.setActivitiesRedis(activities, ticketTypeId);
    return activities;
  }
  return JSON.parse(activities);
}

async function postTicketActivity(ticketId: number, activityId: number, ticketTypeId: number) {
  const ticketActivityCheck = await activityRepository.getTicketActivity(ticketId, activityId);
  if(ticketActivityCheck) {
    throw invalidDataError(["Activity already marked for this ticket"]);
  }

  const newTicketactivity = await activityRepository.getActivityById(activityId);
  const ticketActivities = await activityRepository.getTicketsActivitiesByTicketId(ticketId);

  for (const ticketAct of ticketActivities) {
    if(newTicketactivity.startDate >= ticketAct.Activity.startDate && newTicketactivity.startDate < ticketAct.Activity.endDate) {
      throw invalidDataError(["Activity time conflict"]);
    }
    if(newTicketactivity.endDate > ticketAct.Activity.startDate && newTicketactivity.endDate <= ticketAct.Activity.endDate) {
      throw invalidDataError(["Activity time conflict"]);
    }
  }
  await activityRepository.deleteRedisActivities(ticketTypeId);
  const ticketActivity = await activityRepository.postTicketActivity(ticketId, activityId);
  if(!ticketActivity) {
    throw notFoundError();
  }

  return ticketActivity;
}

const activityService = { getActivities, postTicketActivity };

export default activityService;
