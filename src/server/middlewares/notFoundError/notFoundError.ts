import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import chalk from "chalk";
import { responseErrorData } from "../../utils/responseData/responseData.js";

const debug = createDebug("api-akuma:server:middleware:notFoundError");

const notFoundError = (_req: Request, _res: Response, next: NextFunction) => {
  const error = responseErrorData.endpointNotFound;

  debug(chalk.red(error.message));
  debug(chalk.red(error.statusCode));

  next(error);
};

export default notFoundError;
