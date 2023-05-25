import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { generalError } from "./generalError";

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middleware", () => {
  const error = new CustomError("Endpoint not found", 404);
  describe("When it is called with a CustomError with status 404", () => {
    test("Then it should call res.status with status 404", () => {
      const statusCode = 404;

      const req = {};
      const res: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call res.json with message 'Endpoint not found'", () => {
      const message = {
        message: "Endpoint not found",
      };

      const req = {};
      const res: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(message);
    });
  });

  describe("When it is called with a unknown error", () => {
    const errorWithOutStatus = new Error("Internal server error");
    test("Then it should call res.status with status 500", () => {
      const statusCode = 500;

      const req = {};
      const res: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      generalError(
        errorWithOutStatus as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
    test("Then it should call res.json with message 'Internal server error'", () => {
      const message = {
        message: "Internal server error",
      };

      const req = {};
      const res: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      generalError(
        errorWithOutStatus as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(message);
    });
  });
});
