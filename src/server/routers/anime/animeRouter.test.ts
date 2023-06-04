import request from "supertest";
import app from "../..";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDataBase from "../../../database/connectDataBase";
import mongoose from "mongoose";
import { Anime } from "../../../database/models/Anime";
import { animeMock } from "../../../mocks/anime/animeMock";

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
  await Anime.create(animeMock);
});

afterEach(async () => {
  await Anime.deleteMany();
});

describe("Given a GET /anime endpoint", () => {
  describe("When it receives a valid request", () => {
    test("Then it should respond with status 200", async () => {
      const expectedStatus = 200;
      await request(app).get("/anime").expect(expectedStatus);
    });

    test("Then it should respond with anime list", async () => {
      const response = await request(app).get("/anime");

      expect(response.body.animes).toHaveLength(1);
    });
  });
});
