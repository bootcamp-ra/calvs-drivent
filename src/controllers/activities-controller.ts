import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import activityService from "@/services/activities-service";
import { notFoundError } from "@/errors";

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const ticketTypeIdString = req.query.ticketTypeId;
    if(!ticketTypeIdString) throw notFoundError();
    const ticketTypeId = Number(ticketTypeIdString);
    if(isNaN(ticketTypeId)) throw notFoundError();
    const activities = await activityService.getActivities(ticketTypeId);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
