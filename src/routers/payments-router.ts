import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentByTicketId, paymentProcess, getPaymentByUserId } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .get("/user", getPaymentByUserId)
  .post("/process", paymentProcess);

export { paymentsRouter };
