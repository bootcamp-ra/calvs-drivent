import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivities, getActivitiesBookingCount, getActivitiesDays, getActivitiesSpace } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/days", getActivitiesDays)
  .get("/space", getActivitiesSpace)
  .get("/booking/:activitieId", getActivitiesBookingCount)
  .get("/:dateId/:spaceId", getActivities);

export { activitiesRouter };
