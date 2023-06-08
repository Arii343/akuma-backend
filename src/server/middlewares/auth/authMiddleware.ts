import "../../../loadEnviroment.js";
import { type NextFunction } from "express";
import { type AuthRequest } from "../../types.js";
import CustomError from "../../../CustomError/CustomError.js";
import jwt from "jsonwebtoken";

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader?.includes("Bearer")) {
      const customError = new CustomError("Token not found", 401);
      throw customError;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = payload.sub as string;

    req.userId = userId;

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? new CustomError("Invalid token", 401)
        : error;
    next(customError);
  }
};

export default auth;
