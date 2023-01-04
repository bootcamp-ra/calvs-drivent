import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

import activitiesService from "@/services/activities-service";
import ticketService from "@/services/tickets-service";

export async function getActivitiesDays(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if (ticket.status === "RESERVED" || ticket.TicketType.isRemote === true) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    const activitiesDays = await activitiesService.getActivitiesDays();

    return res.status(httpStatus.OK).send(activitiesDays);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getActivitiesSpace(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if (ticket.status === "RESERVED" || ticket.TicketType.isRemote === true) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    const activitiesSpace = await activitiesService.getActivitiesSpace();

    return res.status(httpStatus.OK).send(activitiesSpace);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
