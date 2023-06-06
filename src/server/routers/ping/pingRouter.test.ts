import request from "supertest";
import app from "../..";

describe("Given a GET / endpoint", () => {
  describe("When it receives a valid request", () => {
    test("Then it should respond with status 200", async () => {
      const expectedStatus = 200;
      await request(app).get("/").expect(expectedStatus);
    });

    test("Then it should respond with '🏓 Pong' message", async () => {
      const expectedMessage = {
        message: "🏓 Pong",
      };
      const response = await request(app).get("/");

      expect(response.body).toStrictEqual(expectedMessage);
    });
  });
});
