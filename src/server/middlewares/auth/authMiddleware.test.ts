import "../../../loadEnviroment.js";
import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import auth from "./authMiddleware";
import CustomError from "../../../CustomError/CustomError.js";
import { type AuthRequest } from "../../types.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an auth middleware", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDc5MDE3YjIxOTVmYzUwM2M1MTMzM2IiLCJpYXQiOjE2ODYyNjE5MDksImV4cCI6MTY4NjM0ODMwOX0.3Rj6qNC52KEo6EzZU440wP7UYZtXO0emNYnzU5DbchI";

  const res = {};
  const next = jest.fn();
  const req: Partial<AuthRequest> = {
    header: jest.fn().mockReturnValue(`Bearer ${token}`),
  };
  describe("When it receives a resquest with a Authorization header and a next function with a valid token", () => {
    test("Then it should call the next function", () => {
      const tokenPayload = {
        sub: "6479017b2195fc503c51333b",
      };

      jwt.verify = jest.fn().mockReturnValue(tokenPayload);

      auth(req as AuthRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with an invalid token and a next function", () => {
    test("Then it should call the next function with the error 'Invalid token' and the status code 401", () => {
      const expectedError = new CustomError("Invalid token", 401);

      expectedError.name = "JsonWebTokenError";

      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as AuthRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request without 'Bearer' and a next function", () => {
    test("Then it should call the next function with the error 'Token not found' and the status code 401", () => {
      const req: Partial<AuthRequest> = {
        header: jest.fn().mockReturnValue(token),
      };

      const expectedError = new CustomError("Token not found", 401);

      auth(req as AuthRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
