import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelsWithRooms, getHotelsWithRoomsAndBookings } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/roomsAndBookings", getHotelsWithRoomsAndBookings)
  .get("/:hotelId", getHotelsWithRooms);

export { hotelsRouter };
