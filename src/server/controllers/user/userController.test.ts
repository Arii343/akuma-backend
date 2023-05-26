import { type NextFunction, type Response } from "express";
import {
  type UserData,
  type UserCredentials,
  type UserCredentialsRequest,
} from "../../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import loginUser from "./userController";
import { Types } from "mongoose";
import { User } from "../../../database/models/User";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

type CustomResponse = Pick<Response, "status" | "json">;

describe("Given a loginUser controller", () => {
  const userCredentials: UserCredentials = {
    email: "admin@admin.net",
    password: "admin",
  };

  const req: Partial<UserCredentialsRequest> = {
    body: userCredentials,
  };

  bcrypt.compare = jest.fn().mockReturnValue(true);

  const token = "token";

  jwt.sign = jest.fn().mockReturnValue(token);

  const next = jest.fn();

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a request with a valid credentials", () => {
    const expectedStatusCode = 200;

    const user: UserData = {
      _id: new Types.ObjectId().toString(),
      email: "admin@admin.net",
      password: "admin",
    };

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(user),
    });

    test("Then it should call a response's status method with a status code 200", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call a response's method json with token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with a wrong email", () => {
    test("Then it should call a next function with a CustomError message 'wrong credentials'", async () => {
      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const customError = new CustomError("wrong credentials", 401);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
  describe("When it receives a request with a wrong password", () => {
    test("Then it should call a next function with CustomError message 'wrong credentials'", async () => {
      const user: UserData = {
        _id: new Types.ObjectId().toString(),
        email: "admin@admin.net",
        password: "admin",
      };

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const customError = new CustomError("wrong credentials", 401);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
