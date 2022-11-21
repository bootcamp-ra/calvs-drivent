import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import {
  createEnrollmentWithAddress,
  createUser,
  createTicketType,
  createTicket,
  createPayment,
  generateCreditCardData,
} from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /payments", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/payments");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/payments").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/payments").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 if query param ticketId is missing", async () => {
      const token = await generateValidToken();

      const response = await server.get("/payments").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 404 when given ticket doesnt exist", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createEnrollmentWithAddress(user);

      const response = await server.get("/payments?ticketId=1").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 401 when user doesnt own given ticket", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();

      const otherUser = await createUser();
      const otherUserEnrollment = await createEnrollmentWithAddress(otherUser);
      const ticket = await createTicket(otherUserEnrollment.id, ticketType.id, TicketStatus.RESERVED);

      const response = await server.get(`/payments?ticketId=${ticket.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 200 and with payment data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const payment = await createPayment(ticket.id, ticketType.price);

      const response = await server.get(`/payments?ticketId=${ticket.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        ticketId: ticket.id,
        value: ticketType.price,
        cardIssuer: payment.cardIssuer,
        cardLastDigits: payment.cardLastDigits,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});

describe("POST /payments/process", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/payments/process");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/payments/process").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/payments/process").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 if body param ticketId is missing", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const body = { cardData: generateCreditCardData() };

      const response = await server.post("/payments/process").set("Authorization", `Bearer ${token}`).send(body);

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 if body param cardData is missing", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const body = { ticketId: ticket };

      const response = await server.post("/payments/process").set("Authorization", `Bearer ${token}`).send(body);

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 404 when given ticket doesnt exist", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createEnrollmentWithAddress(user);

      const body = { ticketId: 1, cardData: generateCreditCardData() };

      const response = await server.post("/payments/process").set("Authorization", `Bearer ${token}`).send(body);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 401 when user doesnt own given ticket", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();

      const otherUser = await createUser();
      const otherUserEnrollment = await createEnrollmentWithAddress(otherUser);
      const ticket = await createTicket(otherUserEnrollment.id, ticketType.id, TicketStatus.RESERVED);

      const body = { ticketId: ticket.id, cardData: generateCreditCardData() };

      const response = await server.post("/payments/process").set("Authorization", `Bearer ${token}`).send(body);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 200 and with payment data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const body = { ticketId: ticket.id, cardData: generateCreditCardData() };

      const response = await server.post("/payments/process").set("Authorization", `Bearer ${token}`).send(body);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        ticketId: ticket.id,
        value: ticketType.price,
        cardIssuer: body.cardData.issuer,
        cardLastDigits: body.cardData.number.slice(-4),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it("should insert a new payment in the database", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const beforeCount = await prisma.payment.count();

      const body = { ticketId: ticket.id, cardData: generateCreditCardData() };
      await server.post("/payments/process").set("Authorization", `Bearer ${token}`).send(body);

      const afterCount = await prisma.payment.count();

      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
    });

    it("should set ticket status as PAID", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const body = { ticketId: ticket.id, cardData: generateCreditCardData() };
      await server.post("/payments/process").set("Authorization", `Bearer ${token}`).send(body);

      const updatedTicket = await prisma.ticket.findUnique({ where: { id: ticket.id } });

      expect(updatedTicket.status).toEqual(TicketStatus.PAID);
    });
  });
});
