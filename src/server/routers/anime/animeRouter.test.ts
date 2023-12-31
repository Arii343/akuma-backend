import request from "supertest";
import app from "../../index.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDataBase from "../../../database/connectDataBase.js";
import mongoose from "mongoose";
import { Anime } from "../../../database/models/Anime.js";
import {
  animeFullMetalAlchemistMock,
  animeMockWithId,
} from "../../../mocks/anime/animeMock.js";
import {
  mockInvalidUserToken,
  mockUserToken,
} from "../../../mocks/user/userMock.js";
import { type AnimeStateStructure } from "../../types.js";

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
  await Anime.create(animeMockWithId);
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

describe("Given a DELETE /anime/:id endpoint", () => {
  describe("When it receives a request with a valid token and an existing anime id", () => {
    test("Then it should respond with status 200", async () => {
      const id = animeMockWithId._id.toString();
      const expectedStatus = 200;

      await request(app)
        .delete(`/anime/${id}`)
        .set("Authorization", `Bearer ${mockUserToken}`)
        .expect(expectedStatus);
    });

    test("Then it should respond with 'Anime deleted' message", async () => {
      const id = animeMockWithId._id.toString();
      const expectedStatus = 200;
      const expectedMessage = "Anime deleted";
      const response = await request(app)
        .delete(`/anime/${id}`)
        .set("Authorization", `Bearer ${mockUserToken}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request with a valid token and an non-existing anime id", () => {
    const nonExistingAnimeId = "6483944aea97048aa181653b";
    const expectedStatus = 404;
    test("Then it should respond with status 404", async () => {
      await request(app)
        .delete(`/anime/${nonExistingAnimeId}`)
        .set("Authorization", `Bearer ${mockUserToken}`)
        .expect(expectedStatus);
    });

    test("Then it should respond with 'Anime not found' message", async () => {
      const expectedMessage = "Anime not found";
      const response = await request(app)
        .delete(`/anime/${nonExistingAnimeId}`)
        .set("Authorization", `Bearer ${mockUserToken}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request with an invalid token", () => {
    const id = animeMockWithId._id.toString();
    const expectedStatus = 401;
    test("Then it should respond with status 401", async () => {
      await request(app)
        .delete(`/anime/${id}`)
        .set("Authorization", `Bearer ${mockInvalidUserToken}`)
        .expect(expectedStatus);
    });

    test("Then it should respond with 'Invalid token' message", async () => {
      const expectedMessage = "Invalid token";
      const response = await request(app)
        .delete(`/anime/${id}`)
        .set("Authorization", `Bearer ${mockInvalidUserToken}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request without a token", () => {
    const id = animeMockWithId._id.toString();
    const expectedStatus = 401;

    test("Then it should respond with 'Token not found' message", async () => {
      const expectedMessage = "Token not found";
      const response = await request(app)
        .delete(`/anime/${id}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a POST /anime endpoint", () => {
  describe("When it receives a request with a new anime data", () => {
    test("Then it should respond with status 201 and the new anime data", async () => {
      const expectedStatus = 201;
      const expectedProperty = "anime";
      const newAnime: AnimeStateStructure = animeFullMetalAlchemistMock;

      const response = await request(app)
        .post("/anime")
        .set("Authorization", `Bearer ${mockUserToken}`)
        .send(newAnime)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(expectedProperty);
    });
  });

  describe("When it receives a new anime data with invalid englishTitle", () => {
    test("Then it should respond with the error 400 and the message 'englishTitle is required'", async () => {
      const expectedStatus = 400;
      const expectedMessage = "Validation Failed";
      const newAnimeWithOutEnglishTitle = {
        ...animeFullMetalAlchemistMock,
        englishTitle: 12,
      };

      const response = await request(app)
        .post("/anime")
        .set("Authorization", `Bearer ${mockUserToken}`)
        .send(newAnimeWithOutEnglishTitle)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
