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

export async function getActivities(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const dateId = Number(req.params.dateId);
  const spaceId = Number(req.params.spaceId);

  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if (ticket.status === "RESERVED" || ticket.TicketType.isRemote === true) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    const activitiesDate = await activitiesService.getActivitiesDayById(dateId);
    if (dateId != activitiesDate.id) {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }

    const activitiesSpace = await activitiesService.getActivitiesSpaceById(spaceId);
    if (spaceId != activitiesSpace.id) {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }

    const activities = await activitiesService.getActivities(dateId, spaceId);

    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getActivitiesBookingCount(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const activitieId = Number(req.params.activitieId);

  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if (ticket.status === "RESERVED" || ticket.TicketType.isRemote === true) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    const activitiesBookingCount = await activitiesService.getActivitiesBookingCounting(activitieId);
    const userBooked = await activitiesService.getUserBookedActivitie(activitieId, userId);

    return res.status(httpStatus.OK).send({ activitiesBookingCount, userBooked });
  } catch (error) {
    return res.status(httpStatus.OK).send({ activitiesBookingCount: 0, userBooked: false });
  }
}

export async function postActivitieBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const activitieId = Number(req.params.activitieId);

  try {
    const booking = await activitiesService.bookActivity(userId, activitieId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "RequestError") return res.sendStatus(httpStatus.BAD_REQUEST);
    if (error.name === "cannotListHotelsError") return res.sendStatus(httpStatus.FORBIDDEN);
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "ConflictError") return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
