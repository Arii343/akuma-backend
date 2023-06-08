import { type NextFunction, type Request, type Response } from "express";
import { Anime } from "../../../database/models/Anime";
import { animeMockWithId, animesMock } from "../../../mocks/anime/animeMock";
import { deleteAnime, getAnimes } from "./animeController";
import { type AuthRequest } from "../../types";
import CustomError from "../../../CustomError/CustomError";

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

describe("Given a deleteAnimes controller", () => {
  const req: Partial<AuthRequest> = {
    params: { id: animeMockWithId._id.toString() },
  };
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  Anime.findByIdAndDelete = jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(animeMockWithId) });

  describe("When it receives a valid delete request with an anime id", () => {
    test("Then it should call a response's status method with a status code 200", async () => {
      const expectedStatus = 200;

      await deleteAnime(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call a response's method json with 'Anime deleted' message", async () => {
      const expectedMessage = { message: "Anime deleted" };

      await deleteAnime(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it receives a request and anime doesn't exist", () => {
    test("Then it should call the next function with the 'Anime not found' error", async () => {
      const req: Partial<AuthRequest> = {
        params: { id: "456" },
      };

      const res = {};
      const next = jest.fn();

      const error = new CustomError("Anime not found", 404);

      Anime.findByIdAndDelete = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      await deleteAnime(
        req as AuthRequest<{ id: string }>,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
