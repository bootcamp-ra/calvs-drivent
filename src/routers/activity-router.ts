import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { listActivities, enterActivity } from "@/controllers";
import { createTicketActivitySchema } from "@/schemas/activities-schema";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("/", listActivities)
  .post("/enter", validateBody(createTicketActivitySchema), enterActivity);

export { activityRouter };
