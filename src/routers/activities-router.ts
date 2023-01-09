import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivities, getActivitiesBookingCount, getActivitiesDays, getActivitiesSpace, postActivitieBooking } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/days", getActivitiesDays)
  .get("/space", getActivitiesSpace)
  .get("/booking/:activitieId", getActivitiesBookingCount)
  .post("/booking/:activitieId", postActivitieBooking)
  .get("/:dateId/:spaceId", getActivities);

export { activitiesRouter };
