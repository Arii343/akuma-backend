import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import chalk from "chalk";

const debug = createDebug("api-akuma:server:middleware:notFoundError");

const notFoundError = (_req: Request, _res: Response, next: NextFunction) => {
  const error = new CustomError("Endpoint not found", 404);

  debug(chalk.red(error.message));
  debug(chalk.red(error.statusCode));

  next(error);
};

export default notFoundError;
