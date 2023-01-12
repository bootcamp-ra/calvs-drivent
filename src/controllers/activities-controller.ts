import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import activityService from "@/services/activities-service";
import { notFoundError } from "@/errors";

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const ticketTypeIdString = req.query.ticketTypeId;
    const ticketTypeId = verifyTicketTypeId(ticketTypeIdString);
    const activities = await activityService.getActivities(ticketTypeId);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function enterActivity(req: AuthenticatedRequest, res: Response) {
  try {
    const { ticketId, activityId } = req.body;
    const ticketTypeIdString = req.query.ticketTypeId;
    const ticketTypeId = verifyTicketTypeId(ticketTypeIdString);
    const ticketActivity = await activityService.postTicketActivity(ticketId, activityId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticketActivity);
  } catch (error) {
    if(error.details[0]==="Activity time conflict") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    if(error.message==="Invalid data") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

function verifyTicketTypeId(ticketTypeIdString: any) {
  if(!ticketTypeIdString) throw notFoundError();
  const ticketTypeId = Number(ticketTypeIdString);
  if(isNaN(ticketTypeId)) throw notFoundError();
  return ticketTypeId;
}
