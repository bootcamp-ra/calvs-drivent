import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivitiesDays, getActivitiesSpace } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/days", getActivitiesDays)
  .get("/space", getActivitiesSpace);

export { activitiesRouter };
