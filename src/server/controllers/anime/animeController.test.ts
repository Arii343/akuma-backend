import { type NextFunction, type Request, type Response } from "express";
import { Anime } from "../../../database/models/Anime";
import { animesMock } from "../../../mocks/anime/animeMock";
import getAnimes from "./animeController";

type CustomResponse = Pick<Response, "status" | "json">;
type CustomRequest = Request<Record<string, unknown>, Record<string, unknown>>;

describe("Given a getAnimes controller", () => {
  const req: Partial<CustomRequest> = {};
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a valid get request", () => {
    Anime.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(animesMock),
      }),
    });
    test("Then it should call a response's status method with a status code 200", async () => {
      const expectedStatus = 200;

      await getAnimes(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
    test("Then it should call a response's method json with animes", async () => {
      await getAnimes(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith({ animes: animesMock });
    });
  });

  describe("When it recieves a valid request but a database error ocurs", () => {
    test("Then 'catch' should capture the error and pass it to 'next' function", async () => {
      const errorWithDatabase = new Error();

      Anime.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockImplementation(() => {
            throw errorWithDatabase;
          }),
        }),
      });

      await getAnimes(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(errorWithDatabase);
    });
  });
});
