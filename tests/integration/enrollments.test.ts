import app, { init } from "@/app";
import { prisma } from "@/config";
import { generateCPF, getStates } from "@brazilian-utils/brazilian-utils";
import faker from "@faker-js/faker";
import dayjs from "dayjs";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createEnrollmentWithAddress, createUser, createhAddressWithCEP } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /enrollments", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/enrollments");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/enrollments").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/enrollments").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 when there is no enrollment for given user", async () => {
      const token = await generateValidToken();

      const response = await server.get("/enrollments").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 and enrollment data with address when there is a enrollment for given user", async () => {
      const user = await createUser();
      const enrollment = await createEnrollmentWithAddress(user);
      const token = await generateValidToken(user);

      const response = await server.get("/enrollments").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: enrollment.id,
        name: enrollment.name,
        cpf: enrollment.cpf,
        birthday: enrollment.birthday.toISOString(),
        phone: enrollment.phone,
        address: {
          id: enrollment.Address[0].id,
          cep: enrollment.Address[0].cep,
          street: enrollment.Address[0].street,
          city: enrollment.Address[0].city,
          state: enrollment.Address[0].state,
          number: enrollment.Address[0].number,
          neighborhood: enrollment.Address[0].neighborhood,
          addressDetail: enrollment.Address[0].addressDetail,
        },
      });
    });
  });
});

describe("GET /enrollments/cep", () => {
  it("should respond with status 200 when CEP is valid", async () => {
    const response = await server.get("/enrollments/cep?cep=04538132");
    const address = createhAddressWithCEP();

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(address);
  });
  it("should respond with status 204 when CEP is valid", async () => {
    const response = await server.get("/enrollments/cep?cep=00");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
});

describe("POST /enrollments", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/enrollments");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/enrollments").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/enrollments").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 when body is not present", async () => {
      const token = await generateValidToken();

      const response = await server.post("/enrollments").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body is not valid", async () => {
      const token = await generateValidToken();
      const body = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await server.post("/enrollments").set("Authorization", `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe("when body is valid", () => {
      const generateValidBody = () => ({
        name: faker.name.findName(),
        cpf: generateCPF(),
        birthday: faker.date.past().toISOString(),
        phone: "(21) 98999-9999",
        address: {
          cep: "90830-563",
          street: faker.address.streetName(),
          city: faker.address.city(),
          number: faker.datatype.number().toString(),
          state: faker.helpers.arrayElement(getStates()).code,
          neighborhood: faker.address.secondaryAddress(),
          addressDetail: faker.lorem.sentence(),
        },
      });

      it("should respond with status 201 and create new enrollment if there is not any", async () => {
        const body = generateValidBody();
        const token = await generateValidToken();

        const response = await server.post("/enrollments").set("Authorization", `Bearer ${token}`).send(body);

        expect(response.status).toBe(httpStatus.OK);
        const enrollment = await prisma.enrollment.findFirst({ where: { cpf: body.cpf } });
        expect(enrollment).toBeDefined();
      });

      it("should respond with status 200 and update enrollment if there is one already", async () => {
        const user = await createUser();
        const enrollment = await createEnrollmentWithAddress(user);
        const body = generateValidBody();
        const token = await generateValidToken(user);

        const response = await server.post("/enrollments").set("Authorization", `Bearer ${token}`).send(body);

        expect(response.status).toBe(httpStatus.OK);
        const updatedEnrollment = await prisma.enrollment.findUnique({ where: { userId: user.id } });
        const addresses = await prisma.address.findMany({ where: { enrollmentId: enrollment.id } });
        expect(addresses.length).toEqual(1);
        expect(updatedEnrollment).toBeDefined();
        expect(updatedEnrollment).toEqual(
          expect.objectContaining({
            name: body.name,
            cpf: body.cpf,
            birthday: dayjs(body.birthday).toDate(),
            phone: body.phone,
          }),
        );
      });
    });

    describe("when body is invalid", () => {
      const generateInvalidBody = () => ({
        name: faker.name.findName(),
        cpf: generateCPF(),
        birthday: faker.date.past().toISOString(),
        phone: "(21) 98999-9999",
        address: {
          cep: "0",
          street: faker.address.streetName(),
          city: faker.address.city(),
          number: faker.datatype.number().toString(),
          state: faker.helpers.arrayElement(getStates()).code,
          neighborhood: faker.address.secondaryAddress(),
          addressDetail: faker.lorem.sentence(),
        },
      });

      it("should respond with status 400 and create new enrollment if there is not any", async () => {
        const body = generateInvalidBody();
        const token = await generateValidToken();

        const response = await server.post("/enrollments").set("Authorization", `Bearer ${token}`).send(body);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });
    });
  });
});
