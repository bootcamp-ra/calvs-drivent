import app, { init } from "@/app";
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import * as jwt from "jsonwebtoken";
import {
  createEnrollmentWithAddress,
  createPayment,
  createTicket,
  createTicketTypeRemote,
  createTicketTypeWithHotel,
  createUser,
} from "../factories";
import { createActivitie, createActivitieBooking, createActivitiesDays, createActivitiesSpace } from "../factories/activities-factory";
import { TicketStatus } from "@prisma/client";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /activities/days", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activities/days");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activities/days").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activities/days").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 403 when user ticket is not paid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const response = await server.get("/activities/days").set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 403 when user ticket is remote", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeRemote();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const response = await server.get("/activities/days").set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 200 and a list of event activities dates", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const activitiesDays = await createActivitiesDays();

      const response = await server.get("/activities/days").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: activitiesDays.id,
          date: activitiesDays.date.toISOString(),
          weekday: activitiesDays.weekday,
          createdAt: activitiesDays.createdAt.toISOString(),
          updatedAt: activitiesDays.updatedAt.toISOString()
        }
      ]);
    });
  });
});

describe("GET /activities/space", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activities/space");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activities/space").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activities/space").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 403 when user ticket is not paid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const response = await server.get("/activities/space").set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 403 when user ticket is remote", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeRemote();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const response = await server.get("/activities/space").set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 200 and a list of event spaces", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      await createActivitiesDays();
      const activitiesSpace = await createActivitiesSpace();

      const response = await server.get("/activities/space").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: activitiesSpace.id,
          name: activitiesSpace.name.toString(),
          createdAt: activitiesSpace.createdAt.toISOString(),
          updatedAt: activitiesSpace.updatedAt.toISOString()
        }
      ]);
    });
  });
});

describe("GET /activities/:dateId/:spaceId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const dateId = faker.random.numeric();
    const spaceId = faker.random.numeric();

    const response = await server.get(`/activities/${dateId}/${spaceId}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const dateId = faker.random.numeric();
    const spaceId = faker.random.numeric();
    const response = await server.get(`/activities/${dateId}/${spaceId}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const dateId = faker.random.numeric();
    const spaceId = faker.random.numeric();
    const response = await server.get(`/activities/${dateId}/${spaceId}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 403 when user ticket is not paid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const dateId = faker.random.numeric();
      const spaceId = faker.random.numeric();
      const response = await server.get(`/activities/${dateId}/${spaceId}`).set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 403 when user ticket is remote", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeRemote();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const dateId = faker.random.numeric();
      const spaceId = faker.random.numeric();
      const response = await server.get(`/activities/${dateId}/${spaceId}`).set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 204 when the date or space dont exist", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const dateId = faker.random.numeric();
      const spaceId = faker.random.numeric();
      const response = await server.get(`/activities/${dateId}/${spaceId}`).set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.NO_CONTENT);
    });

    it("should respond with status 200 and a list of event activities of that space and date", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const activitiesDate =  await createActivitiesDays();
      const dateId = activitiesDate.id;

      const activitiesSpace = await createActivitiesSpace();
      const spaceId = activitiesSpace.id;

      const activity = await createActivitie(dateId, spaceId);

      const response = await server.get(`/activities/${dateId}/${spaceId}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: activity.id,
          name: activity.name.toString(),
          capacity: activity.capacity,
          dateId: activity.dateId,
          spaceId: activity.spaceId,
          duration: activity.duration,
          start: activity.start,
          createdAt: activity.createdAt.toISOString(),
          updatedAt: activity.updatedAt.toISOString()
        }
      ]);
    });
  });
});

describe("GET /activities/booking/:activitieId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const activitieId = faker.random.numeric();
    const response = await server.get(`/activities/booking/${activitieId}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const activitieId = faker.random.numeric();
    const response = await server.get(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const activitieId = faker.random.numeric();
    const response = await server.get(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 403 when user ticket is not paid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const activitieId = faker.random.numeric();
      const response = await server.get(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 403 when user ticket is remote", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeRemote();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const activitieId = faker.random.numeric();
      const response = await server.get(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 200 and a count of activitiy booking", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const ticketId = ticket.id;
      await createPayment(ticket.id, ticketType.price);

      const activitiesDate =  await createActivitiesDays();
      const dateId = activitiesDate.id;
      const activitiesSpace = await createActivitiesSpace();
      const spaceId = activitiesSpace.id;

      const activity = await createActivitie(dateId, spaceId);
      const activitieId = activity.id;

      await createActivitieBooking(activitieId, ticketId);

      const response = await server.get(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual({ activitiesBookingCount: 1 });
    });
  });
});

describe("POST /activities/booking/:activitieId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const activitieId = faker.random.numeric();
    const response = await server.post(`/activities/booking/${activitieId}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const activitieId = faker.random.numeric();
    const response = await server.post(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const activitieId = faker.random.numeric();
    const response = await server.post(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 403 when user ticket is not paid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const activitieId = faker.random.numeric();
      const response = await server.post(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 403 when user ticket is remote", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeRemote();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const activitieId = faker.random.numeric();
      const response = await server.post(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 404 if an activity does not exist", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const activitieId = faker.random.numeric();

      const response = await server.post(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 400 if an activitieId is not a number", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const response = await server.post("/activities/booking/string").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 if activitieId is less than 1", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const response = await server.post("/activities/booking/0").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 403 if activity conflicts with other bookings", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const ticketId = ticket.id;
      await createPayment(ticket.id, ticketType.price);

      const activitiesDate =  await createActivitiesDays();
      const dateId = activitiesDate.id;
      const activitiesSpace = await createActivitiesSpace();
      const spaceId = activitiesSpace.id;

      const otherActivity = await createActivitie(dateId, spaceId);
      await createActivitieBooking(otherActivity.id, ticketId);

      const activity = await createActivitie(dateId, spaceId);
      const activitieId = activity.id;

      const response = await server.post(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 200 and an activity booking added to database", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const activitiesDate =  await createActivitiesDays();
      const dateId = activitiesDate.id;
      const activitiesSpace = await createActivitiesSpace();
      const spaceId = activitiesSpace.id;

      const activity = await createActivitie(dateId, spaceId);
      const activitieId = activity.id;

      const response = await server.post(`/activities/booking/${activitieId}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});
