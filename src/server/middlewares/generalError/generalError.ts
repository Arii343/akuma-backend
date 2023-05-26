import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import type CustomError from "../../../CustomError/CustomError.js";
import { ValidationError } from "express-validation";
import chalk from "chalk";

const debug = createDebug("api-akuma:server:middleware:generalError");

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const validationErrorMessages = error.details.body
      ?.map((joiError) => joiError.message)
      .join(" & ")
      .replaceAll('"', "");

    (error as CustomError).publicMessage = validationErrorMessages;

    debug(chalk.red(validationErrorMessages));
  }

  debug(chalk.red(error.message));

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "Internal server error";

  res.status(statusCode).json({ message });
};
