import "../../../loadEnviroment.js";
import { type NextFunction, type Response } from "express";
import { type AuthRequest } from "../../types.js";
import jwt from "jsonwebtoken";
import { responseErrorData } from "../../utils/responseData/responseData.js";

const auth = (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader?.includes("Bearer")) {
      throw responseErrorData.tokenNotFound;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = payload.sub as string;

    req.userId = userId;

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? responseErrorData.invalidToken
        : error;
    next(customError);
  }
};

export default auth;
