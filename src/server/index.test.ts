import request from "supertest";
import app from ".";

type CustomResponse = {
  status: number;
  body: { message: string };
};

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should call a response with status 200", async () => {
      const expectedStatusCode = 200;

      const response: CustomResponse = await request(app).get("/");

      expect(response.status).toBe(expectedStatusCode);
    });

    test("Then it should call a response with body '🏓 Pong' message", async () => {
      const expectedResponseBody = "🏓 Pong";

      const response: CustomResponse = await request(app).get("/");

      expect(response.body.message).toBe(expectedResponseBody);
    });
  });
});
