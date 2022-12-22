import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getActivitiesDays(req: AuthenticatedRequest, res: Response) {
  try {
    const activitiesDays = await activitiesService.getActivitiesDays();

    return res.status(httpStatus.OK).send(activitiesDays);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
