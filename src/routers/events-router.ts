import { Router } from "express";
import { getDefaultEvent } from "@/controllers";

const eventsRouter = Router();

eventsRouter.get("/", getDefaultEvent);

export { eventsRouter };
