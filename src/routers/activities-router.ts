import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivitiesDays } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/days", getActivitiesDays);

export { activitiesRouter };
