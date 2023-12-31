import "../../../loadEnviroment.js";
import app from "../../index.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../../../database/models/User.js";
import request from "supertest";
import jwt from "jsonwebtoken";
import { type UserCredentials } from "../../types.js";
import connectDataBase from "../../../database/connectDataBase.js";
import mongoose from "mongoose";
import { mockUserHashed } from "../../../mocks/user/userMock.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

beforeEach(async () => {
  await User.create(mockUserHashed);
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST /user/login endpoint", () => {
  describe("When it receives a valid credentials with email 'admin@admin.net' and password 'admin'", () => {
    test("Then it should respond with status 200 and token", async () => {
      const expectedStatus = 200;
      const mockUser: UserCredentials = {
        email: "admin@admin.net",
        password: "admin",
      };

      const newUser = await User.findOne({
        email: mockUser.email,
      });

      const response = await request(app)
        .post("/user/login")
        .send(mockUser)
        .expect(expectedStatus);

      const payload = jwt.verify(
        response.body.token as string,
        process.env.JWT_SECRET!
      );

      const userId = payload.sub;

      expect(userId).toEqual(newUser?._id.toString());
    });
  });

  describe("When it receives a request with invalid email credential 'admins@admin.net'", () => {
    test("Then it should respond a status 401 and message 'Wrong credentials'", async () => {
      const expectedStatus = 401;
      const expectedMessage = "Wrong credentials";
      const mockUserInvalidEmail: UserCredentials = {
        email: "admins@admin.net",
        password: "admin",
      };

      const response = await request(app)
        .post("/user/login")
        .send(mockUserInvalidEmail)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
  describe("When it receives a request with invalid password credential 'admins'", () => {
    test("Then it should respond a status 401 and message 'Wrong credentials'", async () => {
      const expectedStatus = 401;
      const expectedMessage = "Wrong credentials";
      const mockUserInvalidPassword: UserCredentials = {
        email: "admin@admin.net",
        password: "admins",
      };

      const response = await request(app)
        .post("/user/login")
        .send(mockUserInvalidPassword)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
  describe("When it receives a request with invalid format credential email 'admin@admin.net' and password '345'", () => {
    test("Then it should respond with status 400 and 'Validation Failed' message", async () => {
      const expectedStatus = 400;
      const expectedMessage = "Validation Failed";

      const mockUserInvalidLogin = {
        email: "admin@admin.net",
        password: 345,
      };

      const response = await request(app)
        .post("/user/login")
        .send(mockUserInvalidLogin)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
