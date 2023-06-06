import { type Request, type Response } from "express";
import pingController from "./pingController";

describe("Given a pingController controller", () => {
  describe("When it receives a request", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    test("Then it should call the response's method status with 200", () => {
      const expectedStatusCode = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with '🏓 Pong' message", () => {
      const expectedResponseBody = {
        message: "🏓 Pong",
      };

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedResponseBody);
    });
  });
});
